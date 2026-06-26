import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { settings } from '@app/settings'
import { Filters } from '@app/components/filters/Filters'
import { changeFilter } from '@app/components/filters/changeFilter'
import { toggleAllYears } from '@app/components/filters/toggleAllYears'
import { renderComponent } from '@app/test-utils/renderComponent'

jest.mock('@app/components/filters/changeFilter', () => ({
  changeFilter: jest.fn(),
}))
jest.mock('@app/components/filters/toggleAllYears', () => ({
  toggleAllYears: jest.fn(),
}))

const filtersEl = <Filters />

// TEST
describe('Filters', () => {
  // initial render
  it('renders component', () => {
    renderComponent(filtersEl)
    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  // unit select visibility
  describe('displays Unit dropdown based on Type dropdown value', () => {
    it('does not display Unit dropdown for Table type', () => {
      renderComponent(filtersEl)
      const unitSelect = screen.queryByRole('combobox', { name: /unit/i })
      expect(unitSelect).not.toBeInTheDocument()
    })

    it('displays Unit dropdown for Timeline type', () => {
      renderComponent(filtersEl, { type: settings.type.values[1] })
      const unitSelect = screen.queryByRole('combobox', { name: /unit/i })
      expect(unitSelect).toBeInTheDocument()
    })

    it('displays Unit dropdown for Comparison type', () => {
      renderComponent(filtersEl, { type: settings.type.values[2] })
      const unitSelect = screen.queryByRole('combobox', { name: /unit/i })
      expect(unitSelect).toBeInTheDocument()
    })
  })

  // average checkbox visibility
  describe('displays Average checkbox based on Type dropdown and Unit dropdown values', () => {
    it('displays Average checkbox for Table type', () => {
      renderComponent(filtersEl)
      const averageCheckbox = screen.queryByRole('checkbox', { name: settings.average.values[0] })
      expect(averageCheckbox).toBeInTheDocument()
    })

    it('displays Average checkbox for Timeline type and Month unit', () => {
      renderComponent(filtersEl, { type: settings.type.values[1] })
      const averageCheckbox = screen.queryByRole('checkbox', { name: settings.average.values[0] })
      expect(averageCheckbox).toBeInTheDocument()
    })

    it('does not display Average checkbox for Timeline type and Year unit', () => {
      renderComponent(filtersEl, {
        type: settings.type.values[1],
        unit: settings.unit.values[1],
      })
      const averageCheckbox = screen.queryByRole('checkbox', { name: settings.average.values[0] })
      expect(averageCheckbox).not.toBeInTheDocument()
    })

    it('does not display Average checkbox for Comparison type', () => {
      renderComponent(filtersEl, { type: settings.type.values[2] })
      const averageCheckbox = screen.queryByRole('checkbox', { name: settings.average.values[0] })
      expect(averageCheckbox).not.toBeInTheDocument()
    })
  })

  // interactions
  describe('user interactions', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('calls changeFilter when Type dropdown changes', async () => {
      renderComponent(filtersEl)
      const typeSelect = screen.getByRole('combobox', { name: /type/i })
      const user = userEvent.setup()
      await user.selectOptions(typeSelect, settings.type.values[1])
      expect(changeFilter).toHaveBeenCalledWith(expect.anything(), expect.any(Function))
    })

    it('calls changeFilter when Unit dropdown changes', async () => {
      renderComponent(filtersEl, { type: settings.type.values[1] })
      const unitSelect = screen.getByRole('combobox', { name: /unit/i })
      const user = userEvent.setup()
      await user.selectOptions(unitSelect, settings.unit.values[1])
      expect(changeFilter).toHaveBeenCalledWith(expect.anything(), expect.any(Function))
    })

    it('calls changeFilter when Average checkbox toggles', async () => {
      renderComponent(filtersEl)
      const averageCheckbox = screen.getByRole('checkbox', { name: /average/i })
      const user = userEvent.setup()
      await user.click(averageCheckbox)
      expect(changeFilter).toHaveBeenCalledWith(expect.anything(), expect.any(Function))
    })

    it('calls changeFilter when individual Year checkbox toggles', async () => {
      renderComponent(filtersEl)
      const yearCheckbox = screen.getByRole('checkbox', { name: '2023' })
      const user = userEvent.setup()
      await user.click(yearCheckbox)
      expect(changeFilter).toHaveBeenCalledWith(expect.anything(), expect.any(Function))
    })

    it('calls toggleAllYears when All Years checkbox toggles', async () => {
      const store = renderComponent(filtersEl)
      const appYears = store.getState().app.years
      const allYearsCheckbox = screen.getByRole('checkbox', { name: settings.years.values[0] })
      const user = userEvent.setup()
      await user.click(allYearsCheckbox)
      expect(toggleAllYears).toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(Function),
        appYears,
      )
    })
  })
})
