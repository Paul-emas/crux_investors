import { GetUserResponse } from '@/utils/typings'
import Input from '@components/Input'
import { useUser } from '@crux/nextjs-auth0'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Card from './Card'
import PersonalInfoSubmit from './PersonalInfoSubmit'

export type InfoForm = {
  name?: string
  email?: string
  server?: string
}

const PersonalInfo: React.FC = () => {
  const { user, isLoading } = useUser()
  const [initialName, setInitialName] = useState<string>('')
  const [initialEmail, setInitialEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [isPercentUser, setIsPercentUser] = useState<boolean>(false)

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
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
      setValue('name', data.name)
      setIsPercentUser(data.isPercentUser)
      setInitialName(data.name)
    })()
  }, [setValue, setInitialName, setIsPercentUser])

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    clearErrors(['server'])
    const rs = await fetch('/api/crux/user', {
      method: 'PUT',
      body: JSON.stringify({
        email: data.email,
        name: data.name,
      }),
    })
    if (rs.status !== 200) {
      reset()
      setValue('name', data.name)
      setValue('email', data.email)
      setError('server', { message: (await rs.json()).message })
    } else {
      reset()
      setValue('name', data.name)
      setValue('email', data.email)
      setInitialEmail(data.email)
      setInitialName(data.name)
    }
    setLoading(false)
  })

  return (
    <Card title="Personal Information">
      <form onSubmit={onSubmit}>
        <Input
          label="Full Name"
          {...register('name', { required: true })}
          error={errors?.name && 'Full name is required'}
          className={classNames('pb-4')}
          inputClassName="w-full"
          labelClassName="text-neutral-500"
        />
        <Input
          label="Email"
          {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
          error={
            errors?.email?.message ||
            (errors?.email?.type === 'pattern' && 'Email is incorrect') ||
            (errors?.email && 'Email is required')
          }
          className={classNames('pb-4')}
          inputClassName={classNames('w-full', {
            'cursor-not-allowed text-neutral-500': isPercentUser,
          })}
          labelClassName="text-neutral-500"
          disabled={isPercentUser}
        />
        <PersonalInfoSubmit
          loading={loading}
          initialValues={{ email: initialEmail, name: initialName }}
          control={control}
        />
        {errors?.server?.message ? (
          <div className="text-red-600 text-center pt-4">{errors?.server?.message}</div>
        ) : null}
      </form>
    </Card>
  )
}

export default PersonalInfo
