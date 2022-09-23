import Button from '@components/Button'
import React from 'react'
import { Control, useWatch } from 'react-hook-form'

import { InfoForm } from './PersonalInfo'

type PersonalInfoSubmitType = {
  control: Control<InfoForm>
  initialValues: InfoForm
  loading: boolean
}

const PersonalInfoSubmit: React.FC<PersonalInfoSubmitType> = ({
  control,
  initialValues,
  loading,
}) => {
  const email = useWatch({
    control,
    name: 'email',
    defaultValue: initialValues?.email,
  })

  const name = useWatch({
    control,
    name: 'name',
    defaultValue: initialValues?.name,
  })

  return (
    <Button
      working={loading}
      type="submit"
      className="w-full mt-8"
      disabled={email === initialValues?.email && name === initialValues?.name}
    >
      Save
    </Button>
  )
}
export default PersonalInfoSubmit
