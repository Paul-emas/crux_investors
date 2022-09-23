import Button from '@components/Button'
import Chevron from '@components/Svgs/Chevron'
import React from 'react'

import Feature from './Feature'
import FeatureCardNew from './FeatureCardNew'
import { PlanType, StepProps } from './types'

const StepPayment: React.FC<StepProps & { initialPlan: PlanType }> = ({
  onProgress,
  onStep,
  initialPlan,
}) => {
  const [showPlans, setShowPlans] = React.useState<boolean>(!!initialPlan)
  const [selectedPlan, setSelectedPlan] = React.useState<PlanType>(initialPlan || 'yearly')

  React.useEffect(() => {
    if (initialPlan) {
      onProgress(100)
    }
  }, [initialPlan, onProgress])

  const next = React.useCallback(() => {
    if (!showPlans) {
      setShowPlans(true)
      onProgress(100)
      return false
    }
    onStep({ plan: selectedPlan })
  }, [showPlans, onStep, selectedPlan, onProgress])

  const subtitle = 'Forget $1000s on financial advisors or hundreds\nof hours of research'
  return (
    <>
      <h1 className="text-neutral-900 text-2xl md:text-title text-center font-title whitespace-pre">
        {showPlans ? 'Choose the plan that’s right\nfor you' : 'Choose your plan.'}
      </h1>
      {showPlans ? (
        <p className="text-neutral-500 pt-6 whitespace-pre text-center text-sm md:text-subtitle">
          {subtitle}
        </p>
      ) : null}
      <div className="h-12"></div>
      {!showPlans ? (
        <div className="flex flex-col">
          <Feature>Everything for one low price</Feature>
          <Feature>No commitments</Feature>
          <Feature>Cancel anytime</Feature>
        </div>
      ) : null}
      <form
        className="flex flex-col items-center min-w-87 pb-8"
        onSubmit={(e) => e.preventDefault()}
      >
        {showPlans ? (
          <div role="list" className="grid w-full gap-3">
            <FeatureCardNew
              checked={selectedPlan === 'yearly'}
              name="Annual"
              onClick={() => setSelectedPlan('yearly')}
              price="$299/year"
              subtitle={'12 months for the price of 10'}
              tabIndex={0}
            />
            <FeatureCardNew
              checked={selectedPlan === 'monthly'}
              name="Monthly"
              onClick={() => setSelectedPlan('monthly')}
              price="$29.95/month"
              tabIndex={0}
            />
          </div>
        ) : null}
        <div className="h-6 mt-2.5"></div>
        <Button type="submit" fill primary onClick={next}>
          Next{' '}
          <span className="pl-4">
            <Chevron />
          </span>
        </Button>
      </form>
    </>
  )
}

export default StepPayment
