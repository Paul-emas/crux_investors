import Button from '@components/Button'
import Input from '@components/Input'
import Layout from '@components/Layout'
import { useStore } from '@components/StoreProvider'
import classNames from 'classnames'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'

type ForgotPasswordFormData = {
  email: string
}

const ForgotPasswordPage: React.FC<unknown> = () => {
  const store = useStore()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<ForgotPasswordFormData>()

  const onSubmit = handleSubmit(async (data) => {
    if (data.email) {
      const rs = await store.requestPassReset({ email: data.email })
      if (rs.statusCode !== 200 && rs.statusCode !== 403) {
        setError('email', { message: rs?.body?.message || 'Unknown error' })
      } else if (rs.statusCode === 403) {
        router.push('/password/expire')
      } else {
        router.push('/password/confirm')
      }
    }
  })

  return (
    <Layout className="px-4 w-full xs:w-103 max-w-103 mx-auto">
      <Head>
        <title>Forgot Password</title>
      </Head>
      <div className="pt-6">
        <h1 className="text-neutral-035 text-3.5xl whitespace-pre">Forgot password</h1>
        <p className="text-neutral-055 pt-6 text-base">
          We will send you instructions on how to reset your password by email
        </p>
        <form className="pt-6 flex flex-col items-center" onSubmit={onSubmit}>
          <Input
            label="Email"
            placeholder="Email"
            className={classNames('w-full')}
            inputClassName={classNames('w-full')}
            {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
            error={
              errors?.email?.message ||
              (errors?.email?.type === 'pattern' && 'Email is incorrect') ||
              (errors?.email && 'Email is required')
            }
            valid={!errors?.email && !!getValues().email}
          />
          <div className="w-full mt-8">
            <Button type="submit" gray className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPasswordPage
