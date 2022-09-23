import * as nextAuth0 from '@crux/nextjs-auth0'
import { render } from '@testing-library/react'
import * as nextRouter from 'next/router'

import RegisterPage from '../../../pages/signup'

const useRouter = jest.spyOn(nextRouter, 'useRouter')
const useUser = jest.spyOn(nextAuth0, 'useUser')

describe('Register Page', () => {
  it('renders without crashing', () => {
    useRouter.mockImplementation(() => ({ route: '/', query: {}, pathname: '/' } as any))
    useUser.mockImplementation(() => ({ user: {} } as any))
    const { container } = render(<RegisterPage />)
    expect(container).toBeDefined()
  })
})
