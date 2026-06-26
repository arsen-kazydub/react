import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState, AppDispatch } from '@app/store'
import { settings } from '@app/settings'
import { fetchSalaries } from '@app/appThunks'
import { Chart } from '@app/components/chart/Chart'
import { Filters } from '@app/components/filters/Filters'
import { Table } from '@app/components/table/Table'

export function App() {
  const dispatch = useDispatch<AppDispatch>()
  const status = useSelector((state: RootState) => state.app.status)
  const errorMessage = useSelector((state: RootState) => state.app.errorMessage)
  const appType = useSelector((state: RootState) => state.app.type)

  React.useEffect(() => {
    dispatch(fetchSalaries())
  }, [dispatch])

  switch (status) {
    case 'loading':
      return (
        <div className='loader-container'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      )

    case 'error':
      return (
        <div className='error-container'>
          <div className='alert alert-danger' role='alert'>
            Error: {errorMessage}
          </div>
        </div>
      )

    case 'success':
      return (
        <>
          <Filters />
          {appType === settings.type.values[0] ? <Table /> : <Chart />}
        </>
      )
  }
}
