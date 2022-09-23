import * as nextAuth0 from '@crux/nextjs-auth0'
import * as storeProvider from '@components/StoreProvider'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'

import IndexPage from '../../../pages'

const useRouter = jest.spyOn(nextRouter, 'useRouter')
const useUser = jest.spyOn(nextAuth0, 'useUser')
const useStore = jest.spyOn(storeProvider, 'useStore')

describe('Index Page', () => {
  it('renders without crashing', () => {
    useRouter.mockImplementation(() => ({ route: '/', query: {}, pathname: '/' } as any))
    useUser.mockImplementation(() => ({ user: {} } as any))
    useStore.mockImplementation(() => ({ getBookmarks: () => null } as any))

    const { getByText } = render(
      <IndexPage
        data={
          {
            data: {
              banner: {
                companyName: '',
                showName: '',
                heroImageUrl: '',
              } as any,
              latestFeed: {},
              report: {},
              feed: [
                {
                  id: '1',
                  title: '1',
                  type: 'latestFeed',
                  videos: [
                    { showName: 'Test Video', topics: [{ id: '1', name: 'test topic' }] } as any,
                  ],
                },
              ],
            },
            status: 200,
          } as any
        }
        reports={
          {
            data: {
              reports: [],
            },
            status: 200,
            raw: {},
          } as any
        }
      />
    )
    expect(getByText('Test Video')).toBeInTheDocument()
  })

  it('displays error', () => {
    useRouter.mockImplementation(() => ({ route: '/', query: {}, pathname: '/' } as any))
    useUser.mockImplementation(() => ({ user: {} } as any))
    useStore.mockImplementation(() => ({ getBookmarks: () => null } as any))

    const { getByText } = render(
      <IndexPage
        data={
          {
            status: 418,
          } as any
        }
        reports={
          {
            data: {
              reports: [],
            },
            status: 200,
            raw: {},
          } as any
        }
      />
    )
    expect(getByText('Error 418')).toBeInTheDocument()
  })

  it('renders without crashing when no data from API', () => {
    useRouter.mockImplementation(() => ({ route: '/', query: {}, pathname: '/' } as any))
    useUser.mockImplementation(() => ({ user: {} } as any))
    useStore.mockImplementation(() => ({ getBookmarks: () => null } as any))

    const { container } = render(
      <IndexPage
        data={
          {
            data: { feed: [{ title: '1', id: '1' }] },
            status: 200,
          } as any
        }
        reports={
          {
            data: {
              reports: [],
            },
            status: 200,
            raw: {},
          } as any
        }
      />
    )
    expect(container).toBeDefined()
  })
})
