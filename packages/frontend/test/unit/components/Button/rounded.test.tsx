import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Button from '../../../../components/Button/rounded'

describe('Error Page', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Button>Test Button</Button>)
    expect(getByText('Test Button')).toBeInTheDocument()
  })
  it('is clickable', () => {
    const mockCallback = jest.fn(() => null)
    render(<Button onClick={mockCallback}>Test Button</Button>)
    userEvent.click(screen.getByText('Test Button'))
    expect(mockCallback).toBeCalledTimes(1)
  })
  it('not crash when no callback', () => {
    const { container } = render(<Button>Test Button</Button>)
    userEvent.click(screen.getByText('Test Button'))
    expect(container).toBeDefined()
  })
  it('is clickable with keyboard', () => {
    const mockCallback = jest.fn(() => null)
    render(<Button onClick={mockCallback}>Test Button</Button>)
    userEvent.type(screen.getByText('Test Button'), ' ')
    expect(mockCallback).toBeCalled()
  })
})
