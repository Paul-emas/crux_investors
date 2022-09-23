import * as nextAuth0 from '@crux/nextjs-auth0'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'

import HelpCenterPage from '../../../pages/help-center'

const useRouter = jest.spyOn(nextRouter, 'useRouter')
const useUser = jest.spyOn(nextAuth0, 'useUser')

describe('Help Center Page', () => {
  it('renders without crashing', () => {
    useRouter.mockImplementation(() => ({ route: '/', query: {}, pathname: '/' } as any))
    useUser.mockImplementation(() => ({ user: {} } as any))
    const { getByText } = render(<HelpCenterPage />)
    expect(getByText('Help Center')).toBeInTheDocument()
  })
})
