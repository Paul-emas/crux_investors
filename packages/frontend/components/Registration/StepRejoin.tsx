import Button from '@components/Button'
import Chevron from '@components/Svgs/Chevron'
import React from 'react'

import { StepProps } from './types'

const StepRejoin: React.FC<StepProps> = ({ onProgress, onStep }) => {
  React.useEffect(() => {
    onProgress(100)
  }, [onProgress])

  const next = React.useCallback(() => {
    onStep({})
  }, [onStep])

  return (
    <>
      <h1 className="text-neutral-900 text-2xl md:text-title text-center font-title whitespace-pre">
        Re-joining Crux Investor
      </h1>
      <p className="text-neutral-500 pt-6 whitespace-pre text-center text-sm md:text-base leading-5 tracking-tight">
        {`Either you’re re-joining Crux Investor (yay!) or\nthere was an issue with your payment and you\nneed to re-enter/update it. Next, we’ll ask you to\nchoose a plan and set up your payment.`}
      </p>
      <div className="h-6 mt-2.5"></div>
      <div className="w-82">
        <Button type="submit" fill primary onClick={next}>
          Next{' '}
          <span className="pl-4">
            <Chevron />
          </span>
        </Button>
      </div>
    </>
  )
}

export default StepRejoin
