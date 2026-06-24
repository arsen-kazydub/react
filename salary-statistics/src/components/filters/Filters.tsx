import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '@app/store'
import { settings } from '@app/settings'
import { changeFilter } from '@app/components/filters/changeFilter'
import { toggleAllYears } from '@app/components/filters/toggleAllYears'
import { getSelectedYears } from '@app/utils/getSelectedYears'

export function Filters() {
  const dispatch = useDispatch()

  const appType = useSelector((state: RootState) => state.app.type)
  const appUnit = useSelector((state: RootState) => state.app.unit)
  const appAverage = useSelector((state: RootState) => state.app.average)
  const appYears = useSelector((state: RootState) => state.app.years)

  const allYears = Object.keys(appYears).sort()
  const selectedYears = getSelectedYears(appYears)

  const isAllYearsChecked = allYears.length === selectedYears.length

  // if not Table type
  const showUnitFilter = appType !== settings.type.values[0]

  const showAverageFilter =
    // if Table type
    appType === settings.type.values[0] ||
    // if Timeline type and Month unit
    (appType === settings.type.values[1] && appUnit === settings.unit.values[0])

  return (
    <form name='filters'>
      <div className='filters'>
        <div className='select-wrapper'>
          <label>
            <select
              aria-label='Type'
              className='form-select form-select-sm'
              id={settings.type.id}
              value={appType}
              onChange={(e) => changeFilter(e, dispatch)}
            >
              {settings.type.values.map((type, idx) => (
                <option key={idx} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </div>

        {showUnitFilter && (
          <div className='select-wrapper'>
            <label>
              <select
                aria-label='Unit'
                className='form-select form-select-sm'
                id={settings.unit.id}
                value={appUnit}
                onChange={(e) => changeFilter(e, dispatch)}
              >
                {settings.unit.values.map((unit, idx) => (
                  <option key={idx} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        {showAverageFilter && (
          <div className='checkbox-wrapper'>
            <label>
              <input
                aria-label='Average'
                type='checkbox'
                className='form-check-input'
                id={settings.average.id}
                checked={appAverage}
                onChange={(e) => changeFilter(e, dispatch)}
              />
              <span className='text'>{settings.average.values[0]}</span>
            </label>
          </div>
        )}
      </div>

      <div className='filter-years'>
        <label>
          <input
            type='checkbox'
            className='form-check-input'
            checked={isAllYearsChecked}
            onChange={(e) => toggleAllYears(e, dispatch, appYears)}
          />
          <span className='text'>{settings.years.values[0]}</span>
        </label>

        {allYears.map((year, idx) => (
          <label key={idx}>
            <input
              type='checkbox'
              className='form-check-input'
              data-id={settings.years.id}
              value={year}
              checked={appYears[year]}
              onChange={(e) => changeFilter(e, dispatch)}
            />
            <span className='text'>{year}</span>
          </label>
        ))}
      </div>
    </form>
  )
}
