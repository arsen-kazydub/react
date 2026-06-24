import * as React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@app/store'
import { settings } from '@app/settings'
import { Chart } from '@app/components/chart/Chart'
import { Filters } from '@app/components/filters/Filters'
import { Table } from '@app/components/table/Table'

export function App() {
  const appType = useSelector((state: RootState) => state.app.type)
  return (
    <>
      <Filters />
      {appType === settings.type.values[0] ? <Table /> : <Chart />}
    </>
  )
}
