import CreditCardInput from '@components/Input/CreditCardInput'
import classNames from 'classnames'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import CreditCardSubmit from './CreditCardSubmit'

const AddCard: React.FC<any> = ({ setEditMode }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState,
    setError,
    reset,
    control,
    setValue,
    clearErrors,
  } = useForm<any>()

  const { errors } = formState

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    clearErrors()
    const rs = await fetch(`/api/crux/user/billing`, {
      method: 'POST',
      body: JSON.stringify({
        expMonth: data.expiration.split(' / ')[0],
        expYear: `20${data.expiration.split(' / ')[1]}`,
        cvc: data.cvc,
        cardNumber: data.card,
      }),
    })
    if (rs.status === 200) {
      reset()
      setEditMode(false)
      setLoading(false)
      return true
    } else {
      const body = await rs.json()
      setError('card', {
        message: body?.message || body?.errors?.find((e) => e?.msg)?.msg || 'Error',
      })
      reset(null, { keepIsSubmitted: false, keepErrors: true })
      setValue('card', data.card)
      setValue('expiration', data.expiration)
      setValue('cvc', data.cvc)
      setLoading(false)
      throw new Error('error')
    }
  })

  return (
    <form onSubmit={onSubmit} className="px-4 xs:px-0">
      <CreditCardInput
        className={classNames('pb-4')}
        inputClassName="w-full"
        labelClassName="text-neutral-500"
        label="Card number"
        error={
          errors?.card?.message ||
          ((errors?.cvc || errors?.expiration) && 'These fields are required')
        }
        cardRegister={register('card', { required: true })}
        expRegister={register('expiration', { required: true })}
        cvcRegister={register('cvc', { required: true })}
      />
      <CreditCardSubmit loading={loading} control={control} />
    </form>
  )
}

export default AddCard
