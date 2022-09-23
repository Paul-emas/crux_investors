import Button from '@components/Button'
import React from 'react'
import { Control, useWatch } from 'react-hook-form'

import { PasswordForm } from './UpdatePassword'

type UpdateButtonSubmitType = {
  control: Control<PasswordForm>
  loading: boolean
}

const UpdateButtonSubmit: React.FC<UpdateButtonSubmitType> = ({ control, loading }) => {
  const password = useWatch({
    control,
    name: 'password',
  })

  const newPassword = useWatch({
    control,
    name: 'newPassword',
  })

  return (
    <Button
      working={loading}
      type="submit"
      size="base"
      className="w-full mt-8"
      disabled={!password || !newPassword}
    >
      Save
    </Button>
  )
}
export default UpdateButtonSubmit
