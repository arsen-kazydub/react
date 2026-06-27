export function getChartColor(idx: number, opaque?: boolean) {
  // optional argument default
  opaque = typeof opaque === 'undefined' ? true : opaque

  //const saturation = '65%'
  //const lightness = '45%'
  const saturation = '70%'
  const lightness = '52%'
  const opacity = opaque ? 1 : 0.5
  const slo = [saturation, lightness, opacity]

  const colors = [
    [216, ...slo], // primary blue
    [340, ...slo], // raspberry
    [145, ...slo], // green
    [0, '0%', '45%', opacity], // neutral gray
    [275, ...slo], // purple
    [25, ...slo], // orange
    [55, ...slo], // yellow
  ]

  // index must be a positive integer
  if (idx < 0) {
    do idx += colors.length
    while (idx < 0)
  }

  return 'hsla(' + colors[idx % colors.length].join() + ')'
}
