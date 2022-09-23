import { render } from '@testing-library/react'

import App from '../../../pages/_app'

describe('Root App Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <App router={{} as any} pageProps={{ user: {} }} Component={() => <div>Test JEST</div>} />
    )
    // expect(screen.getByRole('heading', { name: 'Welcome to Next.js!' })).toBeInTheDocument()
    expect(getByText('Test JEST')).toBeInTheDocument()
  })
})
