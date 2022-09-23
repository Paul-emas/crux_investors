import { getPrettyTime } from '../../../utils/gen'

describe('Gen Cards Util', () => {
  it('should format seconds to HH:MM:SS formaat', async () => {
    expect(getPrettyTime(10.4)).toBe('00:10')
    expect(getPrettyTime(60)).toBe('01:00')
    expect(getPrettyTime(61)).toBe('01:01')
    expect(getPrettyTime(142)).toBe('02:22')
    expect(getPrettyTime(3599)).toBe('59:59')
    expect(getPrettyTime(3600)).toBe('01:00:00')
    expect(getPrettyTime(435601)).toBe('121:00:01')
  })
})
