import { shortMonths } from '@app/utils/shortMonths'

describe('shortMonths', () => {
  it('returns an array of short month names', () => {
    expect(shortMonths).toEqual([
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ])
  })
})
