import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { GetUserResponse } from '@/utils/typings'
import Input from '@components/Input'
import { useUser } from '@crux/nextjs-auth0'
import classNames from 'classnames'

import PersonalInfoSubmit from './PersonalInfoSubmit'
import Alert from '../Alert'

export type InfoForm = {
  email?: string
  server?: string
}

const EditEmail: React.FC = () => {
  const { user, isLoading } = useUser()
  const [initialEmail, setInitialEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [isPercentUser, setIsPercentUser] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    clearErrors,
  } = useForm<InfoForm>()

  useEffect(() => {
    if (!isLoading && user?.email) {
      setInitialEmail(user.email)
      setValue('email', user.email)
    }
  }, [user.email, isLoading, setInitialEmail, setValue])

  useEffect(() => {
    ;(async () => {
      const rs = await fetch('/api/crux/user', {
        method: 'GET',
      })
      const data = (await rs.json()) as GetUserResponse
      setIsPercentUser(data.isPercentUser)
    })()
  }, [setValue, setIsPercentUser])

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    clearErrors(['server'])
    const rs = await fetch('/api/crux/user', {
      method: 'PUT',
      body: JSON.stringify({
        email: data.email,
      }),
    })
    if (rs.status !== 200) {
      reset()
      setValue('email', data.email)
      setError(true)
      setErrorMessage((await rs.json()).message)
      setOpenAlert(true)
    } else {
      setErrorMessage('Email changed')
      reset()
      setValue('email', data.email)
      setInitialEmail(data.email)
      setOpenAlert(true)
    }
    setLoading(false)
  })

  return (
    <>
      <Alert icon error={error} open={openAlert} setOpen={setOpenAlert}>
        {errorMessage}
      </Alert>
      <form onSubmit={onSubmit}>
        <Input
          label="Email"
          {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
          error={
            errors?.email?.message ||
            (errors?.email?.type === 'pattern' && 'Email is incorrect') ||
            (errors?.email && 'Email is required')
          }
          className={classNames('pb-0')}
          inputClassName={classNames('w-full', {
            'cursor-not-allowed text-neutral-035': isPercentUser,
          })}
          labelClassName="text-neutral-035"
          disabled={isPercentUser}
        />
        <PersonalInfoSubmit
          loading={loading}
          initialValues={{ email: initialEmail }}
          control={control}
        />
        {errors?.server?.message ? (
          <div className="text-red-600 text-center pt-4">{errors?.server?.message}</div>
        ) : null}
      </form>
    </>
  )
}

export default EditEmail
