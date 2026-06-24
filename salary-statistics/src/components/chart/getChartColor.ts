export function getChartColor(idx: number, opaque?: boolean) {
  // optional argument default
  opaque = typeof opaque === 'undefined' ? true : opaque

  const saturation = '65%'
  const lightness = '45%'
  const opacity = opaque ? 1 : 0.5
  const slo = [saturation, lightness, opacity]

  // hex original:
  // 240 - blue,
  //   0 - red,
  // 120 - green,
  // 270 - purple,
  //  40 - orange,
  //  60 - yellow
  const colors = [
    [210, ...slo],
    [340, ...slo],
    [140, ...slo],
    [0, '0%', '40%', opacity],
    [270, ...slo],
    [10, ...slo],
    [60, ...slo],
  ]

  // index must be a positive integer
  if (idx < 0) {
    do idx += colors.length
    while (idx < 0)
  }

  return 'hsla(' + colors[idx % colors.length].join() + ')'
}
