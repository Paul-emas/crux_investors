import { withErrorHandler } from '../../../utils/withErrorHandler'

describe('Pages Error Handler', () => {
  it('call callback', async () => {
    const mockCallback = jest.fn(() => 43)
    const rs = await withErrorHandler(mockCallback as any)({ data: 42 } as any)

    expect(rs).toBe(43)
    expect(mockCallback).toBeCalledWith({ data: 42 })
  })

  it('should handle access_token_expired', async () => {
    const mockCallback = jest.fn(() => {
      throw { code: 'access_token_expired' }
    })
    const rs = await withErrorHandler(mockCallback as any)({ data: 42 } as any)
    expect(rs).toEqual({ redirect: { statusCode: 302, destination: '/api/auth/login' } })
  })

  it('should handle other errors', async () => {
    const mockCallback = jest.fn(() => {
      throw new Error('test')
    })
    const rs = await withErrorHandler(mockCallback as any)({ data: 42 } as any)
    expect(rs).toEqual({ redirect: { statusCode: 302, destination: '/error' } })
  })
})
