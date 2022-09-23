import Button from '@components/Button'
import Input from '@components/Input'
import Chevron from '@components/Svgs/Chevron'
import classNames from 'classnames'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useStore } from '../StoreProvider'
import { StepProps } from './types'

type EmailFormData = {
  email: string
  password: string
}

const StepEmail: React.FC<StepProps> = ({ onStep, onProgress }) => {
  const store = useStore()
  const [loading, setLoading] = useState(false)

  React.useEffect(() => {
    onProgress((10 / 80) * 100)
  }, [onProgress])

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setError,
  } = useForm<EmailFormData>({ mode: 'onBlur', reValidateMode: 'onChange' })

  const [showPassword, setShowPassword] = React.useState(false)

  const onSubmit = handleSubmit(async (data) => {
    if (!showPassword) {
      setShowPassword(true)
      reset({ email: data.email })
      onProgress((54 / 80) * 100)
      return false
    }

    if (data.email && data.password) {
      setLoading(true)
      const rs = await store.register({
        email: data.email,
        password: data.password,
      })
      if (rs.statusCode !== 200) {
        if (rs?.body?.message?.includes('Password')) {
          setError('password', { message: rs.body.message?.split(': ')?.[1] || rs.body.message })
        } else {
          if (rs?.body?.message === 'The user already exists.') {
            setError('email', { message: 'This email is already in use' })
          } else {
            setError('email', { message: rs?.body?.message || 'Unknown error' })
          }
        }
        setLoading(false)
        return
      }
      onStep(data)
    }
    setLoading(false)
  })

  const title = showPassword
    ? 'Create a password to start\nyour membership.'
    : 'Better performance\nless time.'

  const subtitle = showPassword
    ? 'Just two more steps and you’re done!'
    : 'Register your email to create your membership.'

  return (
    <>
      <h1 className="text-neutral-900 text-2xl md:text-title text-center font-title whitespace-pre">
        {title}
      </h1>
      <p className="text-neutral-500 pt-6 whitespace-pre text-center text-sm md:text-subtitle">
        {subtitle}
      </p>
      <div className="w-82">
        <form className="pt-6 pb-8" onSubmit={onSubmit}>
          <Input
            inputClassName="w-full"
            className={classNames('pb-4', { 'mb-8': !showPassword })}
            label="Email"
            {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
            error={
              errors?.email?.message ||
              (errors?.email?.type === 'pattern' && 'Email is incorrect') ||
              (errors?.email && 'Email is required')
            }
            valid={!errors?.email && !!getValues().email}
          />
          {showPassword ? (
            <Input
              className={classNames('mb-12')}
              inputClassName="w-full"
              autoComplete="new-password"
              label="Password"
              type="password"
              {...register('password', { required: true, minLength: 8 })}
              error={
                errors?.password?.message ||
                (errors?.password?.type === 'minLength' &&
                  'Your password must be 8 characters or longer') ||
                (errors?.password && 'Password is required')
              }
              valid={!errors?.password && !!getValues().password}
            />
          ) : null}

          <Button working={loading} type="submit" className="w-full px-3" primary>
            {showPassword ? 'Create Account' : 'Continue'}
            <span className="pl-4">
              <Chevron />
            </span>
          </Button>
        </form>
      </div>
    </>
  )
}

export default StepEmail
