import * as nextAuth0 from '@crux/nextjs-auth0'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'

import ErrorPage from '../../../pages/error'

const useRouter = jest.spyOn(nextRouter, 'useRouter')
const useUser = jest.spyOn(nextAuth0, 'useUser')

describe('Error Page', () => {
  it('renders without crashing', () => {
    useRouter.mockImplementation(() => ({ route: '/', query: {}, pathname: '/' } as any))
    useUser.mockImplementation(() => ({ user: {} } as any))
    const { getByText } = render(<ErrorPage />)
    expect(getByText('Error')).toBeInTheDocument()
  })
})
