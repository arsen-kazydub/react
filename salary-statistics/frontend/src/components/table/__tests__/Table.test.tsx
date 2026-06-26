import React from 'react'
import { screen, within } from '@testing-library/react'

import { Table } from '@app/components/table/Table'
import { renderComponent } from '@app/test-utils/renderComponent'

const tableEl = <Table />

// TEST
describe('Table', () => {
  // initial render
  it('renders component', () => {
    renderComponent(tableEl)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  // rows and data
  it('renders correct number of rows and salary data for 2023', () => {
    renderComponent(tableEl)
    const salaryRow = screen.getByText('2023').closest('tr') as HTMLTableRowElement
    const salaryCells = within(salaryRow).getAllByRole('cell')
    expect(salaryCells).toHaveLength(14)
    expect(salaryCells[1]).toHaveTextContent('1,000')
  })

  // average salaries
  it('displays average salaries when Average checkbox is true', () => {
    renderComponent(tableEl, { average: true })
    const salaryRow = screen.getByText('2023').closest('tr') as HTMLTableRowElement
    const salaryCells = within(salaryRow).getAllByRole('cell')
    const averages = salaryCells.map((cell) => cell.querySelector('.average')).filter(Boolean)
    expect(averages).toHaveLength(12)
    expect(averages[0]).toHaveTextContent('80')
  })
})
