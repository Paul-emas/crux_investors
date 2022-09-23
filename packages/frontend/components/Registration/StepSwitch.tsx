import React from 'react'

import StepCard from './StepCard'
import StepEmail from './StepEmail'
import StepPayment from './StepPayment'
import StepRejoin from './StepRejoin'
import { RegistrationData } from './types'

type StepSwitchProps = {
  data: RegistrationData
  onData: (key: string, data: unknown) => void
  setProgress: (v: number) => void
  setStep: (v: number) => void
  step: number
  onDone: (data: any) => void
  rejoinFlow?: boolean
}

const StepSwitch: React.FC<StepSwitchProps> = ({
  step,
  setProgress,
  setStep,
  onData,
  data,
  onDone,
  rejoinFlow,
}) => {
  switch (step) {
    case 0:
      return rejoinFlow ? (
        <StepRejoin
          onStep={() => {
            setProgress(1)
            setStep(1)
          }}
          onProgress={setProgress}
        />
      ) : (
        <StepEmail
          onStep={(newData) => {
            onData('credentials', newData)
            ;(global as any)?.analytics?.track('Sign Up Started', {})
            setProgress(1)
            setStep(1)
          }}
          onProgress={setProgress}
        />
      )
    case 1:
      return (
        <StepPayment
          onStep={(newData) => {
            onData('payment', newData)
            setStep(2)
          }}
          initialPlan={data.payment?.plan}
          onProgress={setProgress}
        />
      )
    case 2:
      return (
        <StepCard
          onStep={(newData: any) => {
            onData('card', newData)
            setTimeout(() => {
              if (!rejoinFlow) {
                ;(global as any)?.analytics?.track('Sign Up Completed', {
                  ...data.payment,
                  ...newData,
                })
              }
              onDone(newData)
            })
          }}
          onBack={() => {
            setStep(1)
          }}
          initialPlan={data.payment?.plan}
          onProgress={setProgress}
        />
      )
    default:
      return <div></div>
  }
}

export default StepSwitch
