import * as nextAuth0 from '@crux/nextjs-auth0'
import * as storeProvider from '@components/StoreProvider'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'

import VideoSlugPage from '../../../../pages/v/[slug]'

const useRouter = jest.spyOn(nextRouter, 'useRouter')
const useUser = jest.spyOn(nextAuth0, 'useUser')
const useStore = jest.spyOn(storeProvider, 'useStore')

describe('Single Video Page', () => {
  it('renders without crashing', () => {
    useRouter.mockImplementation(() => ({ route: '/', query: {}, pathname: '/' } as any))
    useUser.mockImplementation(() => ({ user: {} } as any))
    useStore.mockImplementation(
      () => ({ getBookmarks: () => null, bookmarks: [{ videoId: '123' }] } as any)
    )

    const { container } = render(
      <VideoSlugPage
        data={{ data: { video: { aspectRatio: '16:9' } } } as any}
        user={{} as any}
        related={[{ videoId: '123', video: { aspectRatio: '16:9' } }] as any[]}
      />
    )
    expect(container).toBeDefined()
  })
})
