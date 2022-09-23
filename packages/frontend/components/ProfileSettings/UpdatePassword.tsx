import Input from '@components/Input'
import classNames from 'classnames'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Alert from '../Alert'
import UpdateButtonSubmit from './UpdateButtonSubmit'

export type PasswordForm = {
  password: string
  newPassword: string
  server: string
}

const UpdatePassword: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    clearErrors,
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
  } = useForm<PasswordForm>({
    mode: 'onBlur',
  })

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    clearErrors(['server'])
    const rs = await fetch('/api/crux/user/password', {
      method: 'PUT',
      body: JSON.stringify({
        newPassword: data.password,
      }),
    })
    reset()
    if (rs.status !== 200) {
      const body = await rs.json()
      if (body?.message?.startsWith('PasswordStrengthError')) {
        setError('password', {
          message:
            'Your password should contain a lower-case letter, an upper-case letter, a number and ideally a special character.',
        })
      } else {
        setError('server', { message: body?.message || 'Error' })
      }
      setValue('password', data.password)
      setValue('newPassword', data.password)
    }
    setErrorMessage('Password Changed')
    setOpenAlert(true)
    setLoading(false)
  })

  return (
    <>
      <Alert icon open={openAlert} setOpen={setOpenAlert}>
        {errorMessage}
      </Alert>
      <form onSubmit={onSubmit}>
        <Input
          {...register('password', { required: true, minLength: 8 })}
          error={
            errors?.password?.message ||
            (errors?.password?.type === 'minLength' &&
              'Your password must be 8 characters or longer') ||
            (errors?.password && 'Password is required')
          }
          valid={!errors?.password && !!getValues().password}
          className={classNames('pb-4')}
          inputClassName="w-full"
          label="Current password"
          autoComplete="new-password"
          type="password"
        />
        <Input
          {...register('newPassword', {
            required: true,
            validate: {
              same: (v) => v === getValues().password,
            },
          })}
          error={
            (errors?.newPassword?.type === 'same' && "Passwords don't match") ||
            (errors?.newPassword && 'Password confirmation is required')
          }
          valid={!errors?.newPassword && !!getValues().newPassword}
          className={classNames('pb-0')}
          inputClassName="w-full"
          label="New Password"
          autoComplete="new-password"
          type="password"
        />
        <UpdateButtonSubmit control={control} loading={loading} />
        {errors?.server?.message ? (
          <div className="text-red-600 text-center pt-4">{errors?.server?.message}</div>
        ) : null}
      </form>
    </>
  )
}

export default UpdatePassword
