// all years - false, last year - true
export function initialYearsState(oSalaries: Record<string, number[]>) {
  let initYears: Record<string, boolean> = {}
  const years = Object.keys(oSalaries)
  years.forEach((year, idx) => {
    initYears[year] = idx === years.length - 1
  })
  return initYears
}
