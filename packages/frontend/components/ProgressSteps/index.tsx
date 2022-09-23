import React from 'react'

type ProgressStepsProps = {
  steps?: number
  current?: number
  progress?: number
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps = 3,
  current = 0,
  progress = 1000,
}) => {
  return (
    <div className="flex flex-col items-center justify-center pb-12">
      <span className="text-base tracking-tight text-neutral-300 pb-2.5">
        {current + 1} / {steps}
      </span>
      <div className="flex items-center justify-center">
        {new Array(steps).fill(null).map((_, key) => (
          <div key={key} className="h-0.5 w-20 flex-1 bg-neutral-100 mx-1">
            {key <= current ? (
              <div
                className="h-full bg-neutral-900 transition-width duration-500 ease-out"
                style={{ width: key === current ? `${progress}%` : '100%' }}
              ></div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressSteps
