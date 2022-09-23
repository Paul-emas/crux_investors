import Button from '@components/Button'
import React from 'react'
import { Control, useWatch } from 'react-hook-form'

import { UpdateCardForm } from './CreditCard'

type CreditCardSubmitType = {
  control: Control<UpdateCardForm>
  initialValues?: UpdateCardForm
  loading: boolean
}

const CreditCardSubmit: React.FC<CreditCardSubmitType> = ({
  control,
  initialValues = {},
  loading,
}) => {
  const card = useWatch({
    control,
    name: 'card',
    defaultValue: initialValues?.card,
  })

  const cvc = useWatch({
    control,
    name: 'cvc',
    defaultValue: initialValues?.cvc,
  })

  const expiration = useWatch({
    control,
    name: 'expiration',
    defaultValue: initialValues?.expiration,
  })

  return (
    <Button
      working={loading}
      type="submit"
      size="large"
      disabled={!card || !cvc || !expiration}
      className="w-full mt-4"
    >
      Save
    </Button>
  )
}
export default CreditCardSubmit
