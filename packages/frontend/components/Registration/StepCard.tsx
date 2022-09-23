import { GetUserResponse } from '@/utils/typings'
import { useUser } from '@crux/nextjs-auth0'
import Button from '@components/Button'
import Input from '@components/Input'
import CreditCardInput from '@components/Input/CreditCardInput'
import Chevron from '@components/Svgs/Chevron'
import Lock from '@components/Svgs/Lock'
import { enterOrSpace } from '@utils/accessibility'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useStore } from '../StoreProvider'
import { PlanType, StepProps } from './types'

type PaymentFormData = {
  name: string
  card: string
  expiration: string
  cvc: string
}

const StepCard: React.FC<StepProps & { initialPlan: PlanType }> = observer(
  ({ onStep, initialPlan = 'yearly', onBack }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useUser()
    const store = useStore()

    const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
      setError,
      setValue,
    } = useForm<PaymentFormData>({
      mode: 'onBlur',
    })

    useEffect(() => {
      ;(async () => {
        if (user && store) {
          setLoading(true)
          let rs = await fetch('/api/crux/user', {
            method: 'GET',
          })
          let data = (await rs.json()) as GetUserResponse
          if (!data?._id) {
            rs = await fetch('/api/crux/user', {
              method: 'GET',
            })
            data = (await rs.json()) as GetUserResponse
          }
          setValue('name', data.name)
          store.setUserId(data._id)
          ;(global as any)?.analytics?.identify(data._id, user)
          setLoading(false)
        }
      })()
    }, [user, setLoading, setValue, store])

    const onSubmit = handleSubmit(async (data) => {
      setLoading(true)
      const body = {
        cardExpMonth: data.expiration.split(' / ')[0],
        cardExpYear: `20${data.expiration.split(' / ')[1]}`,
        cardNumber: data.card,
        cvc: data.cvc,
        type: initialPlan,
        name: data.name,
      }

      const rs = await store.subscribe(body)
      if (rs.statusCode !== 200) {
        if (rs.body?.errors?.some((e) => ['cardNumber', 'cardExpMonth', 'cvc'].includes(e.param))) {
          setError('card', { message: rs?.body?.message || 'Incorrect Card details' })
        } else {
          setError('card', { message: rs?.body?.message })
        }
        setLoading(false)
        return
      }
      onStep(rs)
      setLoading(false)
    })

    const plans: { [key: string]: { name: string; price: string } } = {
      yearly: { name: 'Annual', price: '$299/year' },
      monthly: { name: 'Monthly', price: '$29.95/monthly' },
    }

    return (
      <>
        <h1 className="text-neutral-900 text-2xl md:text-title text-center font-title whitespace-pre">
          Set up your payment.
        </h1>
        <p className="text-neutral-500 pt-6 whitespace-pre text-center text-sm md:text-subtitle">
          No commitments. Cancel online at any time.
        </p>
        <div className="w-82">
          <form className="pt-6 pb-8" onSubmit={onSubmit}>
            <Input
              label="Full name"
              inputClassName="w-full"
              className={classNames('pb-4')}
              {...register('name', {
                required: true,
                validate: { fullName: (v) => v?.split?.(' ')?.length > 1 },
              })}
              error={errors?.name && 'Full name is required'}
              valid={!errors?.name && !!getValues().name}
            />
            <CreditCardInput
              inputClassName="w-full"
              className={classNames('pb-4')}
              labelAppend={
                <div className="flex items-center">
                  <span className="pr-1.25 text-xs text-neutral-600">Secure Server</span> <Lock />
                </div>
              }
              label="Credit or debit card"
              error={
                errors?.card?.message ||
                ((errors?.card || errors?.cvc || errors?.expiration) && 'This field is required')
              }
              cardRegister={register('card', { required: true })}
              expRegister={register('expiration', { required: true })}
              cvcRegister={register('cvc', { required: true })}
            />
            <div className="w-full mt-3">
              <div className="flex flex-col justify-between bg-neutral-100 w-full rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="text-neutral-800 text-sm font-title">
                    {plans[initialPlan].name}
                  </div>
                  <div
                    tabIndex={0}
                    onKeyDown={enterOrSpace(() => onBack())}
                    onClick={onBack}
                    role="button"
                    className="text-colour-g2 hover:underline text-xs"
                  >
                    Change
                  </div>
                </div>
                <div className="mt-1.75">
                  <div className="text-neutral-600 text-xsm font-title">
                    {plans[initialPlan].price}
                  </div>
                </div>
              </div>
            </div>
            <div className="h-12"></div>
            <Button working={loading} type="submit" className="w-full px-3" primary>
              Start Membership
              <span className="pl-4">
                <Chevron />
              </span>
            </Button>
          </form>
        </div>
      </>
    )
  }
)

export default StepCard
