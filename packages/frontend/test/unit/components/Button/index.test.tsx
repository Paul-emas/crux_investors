import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../../../../components/Button'

describe('Error Page', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Button>Test Button</Button>)
    expect(getByText('Test Button')).toBeInTheDocument()
  })
  it('renders loading without crashing', () => {
    const { container } = render(<Button loading>Test Button</Button>)
    expect(container).toBeDefined()
  })
  it('clicks', () => {
    const mockCallback = jest.fn(() => null)
    render(<Button onClick={mockCallback}>Test Button</Button>)
    userEvent.click(screen.getByText('Test Button'))
    expect(mockCallback).toBeCalledTimes(1)
  })
  it('not clicks when disabled', () => {
    const mockCallback = jest.fn(() => null)
    render(
      <Button disabled onClick={mockCallback}>
        Test Button
      </Button>
    )
    userEvent.click(screen.getByText('Test Button'))
    expect(mockCallback).toBeCalledTimes(0)
  })
  it('not crash when no callback', () => {
    const { container } = render(<Button>Test Button</Button>)
    userEvent.click(screen.getByText('Test Button'))
    expect(container).toBeDefined()
  })
})
