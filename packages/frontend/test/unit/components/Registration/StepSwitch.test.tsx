import { render } from '@testing-library/react'

import StepSwitch from '../../../../components/Registration/StepSwitch'
import * as storeProvider from '@components/StoreProvider'
const useStore = jest.spyOn(storeProvider, 'useStore')

describe('Error Page', () => {
  it('renders without crashing (Step 1)', () => {
    useStore.mockImplementation(() => ({ userName: 'test' } as any))

    const { container } = render(
      <StepSwitch
        data={{} as any}
        setStep={() => null}
        setProgress={() => null}
        onData={() => null}
        step={0}
        onDone={() => null}
      />
    )
    expect(container).toBeDefined()
  })

  it('renders without crashing (Step 2)', () => {
    useStore.mockImplementation(() => ({ userName: 'test' } as any))

    const { container } = render(
      <StepSwitch
        data={{} as any}
        setStep={() => null}
        setProgress={() => null}
        onData={() => null}
        step={1}
        onDone={() => null}
      />
    )
    expect(container).toBeDefined()
  })

  it('renders without crashing (Step 3)', () => {
    useStore.mockImplementation(() => ({ userName: 'test' } as any))

    const { container } = render(
      <StepSwitch
        data={{} as any}
        setStep={() => null}
        setProgress={() => null}
        onData={() => null}
        step={2}
        onDone={() => null}
      />
    )
    expect(container).toBeDefined()
  })
})
