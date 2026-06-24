export function getSelectedYears(years: Record<string, boolean>) {
  return Object.keys(years)
    .sort()
    .filter((year) => years[year])
    .map((year) => parseInt(year))
}
