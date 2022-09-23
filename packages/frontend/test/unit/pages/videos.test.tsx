import * as nextAuth0 from '@crux/nextjs-auth0'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'

import Videos from '../../../pages/videos'

const useRouter = jest.spyOn(nextRouter, 'useRouter')
const useUser = jest.spyOn(nextAuth0, 'useUser')

describe('Videos Page', () => {
  it('renders without crashing', () => {
    useRouter.mockImplementation(() => ({ route: '/', query: {}, pathname: '/' } as any))
    useUser.mockImplementation(() => ({ user: {} } as any))
    const { getByText } = render(
      <Videos
        data={{
          data: {
            banner: {
              companyName: '',
              showName: '',
              heroImageUrl: '',
            } as any,
            feed: [
              {
                id: '1',
                title: '1',
                type: 'latestFeed',
                videos: [
                  { showName: 'Test Video', topics: [{ id: '1', name: 'test topic' }] } as any,
                ],
                object: {
                  id: '2',
                  name: '2',
                  type: '2',
                },
              },
            ],
          },
          status: 200,
        }}
      />
    )
    expect(getByText('Test Video')).toBeInTheDocument()
  })

  it('displays error', () => {
    useRouter.mockImplementation(() => ({ route: '/', query: {}, pathname: '/' } as any))
    useUser.mockImplementation(() => ({ user: {} } as any))
    const { getByText } = render(
      <Videos
        data={
          {
            status: 418,
          } as any
        }
      />
    )
    expect(getByText('Error 418')).toBeInTheDocument()
  })

  it('renders without crashing when no data from API', () => {
    useRouter.mockImplementation(() => ({ route: '/', query: {}, pathname: '/' } as any))
    useUser.mockImplementation(() => ({ user: {} } as any))
    const { container } = render(
      <Videos
        data={
          {
            data: { feed: [{ title: '1', id: '1' }] },
            status: 200,
          } as any
        }
      />
    )
    expect(container).toBeDefined()
  })
})
