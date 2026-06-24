interface Settings {
  type: { id: string; values: string[] }
  unit: { id: string; values: string[] }
  average: { id: string; values: string[] }
  years: { id: string; values: string[] }
}

export const settings: Settings = {
  type: {
    id: 'filterType',
    values: ['Table', 'Timeline', 'Comparison'],
  },
  unit: {
    id: 'filterUnit',
    values: ['Month', 'Year'],
  },
  average: {
    id: 'filterAverage',
    values: ['Average'],
  },
  years: {
    id: 'filterYears',
    values: ['All'],
  },
}
