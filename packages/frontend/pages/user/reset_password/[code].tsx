import Button from '@components/Button'
import Input from '@components/Input'
import Layout from '@components/Layout'
import { useStore } from '@components/StoreProvider'
import Chevron from '@components/Svgs/Chevron'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'

type ResetPasswordFormData = {
  password: string
  newPasswordConfirm: string
  token?: string
}

const ResetPasswordPage: React.FC<unknown> = () => {
  const store = useStore()
  const router = useRouter()
  const [showConfirm, setShowConfirm] = React.useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<ResetPasswordFormData>()

  const onSubmit = handleSubmit(async (data) => {
    const rs = await store.resetPass(router.query.code as string, { password: data.password })
    if (rs.statusCode !== 200) {
      if (rs.body?.message?.includes('token')) {
        setError('token', { message: 'Incorrect reset URL or expired' })
      } else {
        setError('password', { message: rs.body?.message })
      }
    } else {
      setShowConfirm(true)
    }
  })

  if (showConfirm) {
    return (
      <Layout>
        <Head>
          <title>Password Changed!</title>
        </Head>
        <div className="flex flex-col items-center pt-18">
          <h1 className="text-neutral-900 text-header text-center font-title whitespace-pre">
            {'Reset your password'}
          </h1>
          <div className="flex flex-col">
            <div className="text-center whitespace-pre bg-neutral-100 py-18 px-16 rounded-lg text-sm mt-10 mb-5">
              {'Your password has been\nsuccessfully changed!'}
            </div>
            <Link href="/api/auth/login">
              <a>
                <Button fill primary>
                  <span className="pr-4">
                    <Chevron dir="left" />
                  </span>
                  Back to Sign In
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Reset Password</title>
      </Head>
      <div className="flex flex-col items-center pt-18">
        <h1 className="text-neutral-900 text-header text-center font-title whitespace-pre">
          {'Reset your password'}
        </h1>
        <form className="pt-6 flex flex-col items-center pb-8" onSubmit={onSubmit}>
          <Input
            autoComplete="new-password"
            label="New password"
            {...register('password', { required: true, minLength: 8 })}
            error={
              errors?.password?.message ||
              (errors?.password?.type === 'minLength' &&
                'Your password must be 8 characters or longer') ||
              (errors?.password && 'Password is required')
            }
            valid={!errors?.password && !!getValues().password}
          />
          <Input
            autoComplete="new-password"
            label="Confirm new password"
            {...register('newPasswordConfirm', {
              required: true,
              validate: {
                same: (v) => v === getValues().password,
              },
            })}
            error={
              (errors?.newPasswordConfirm?.type === 'same' && "Passwords don't match") ||
              (errors?.newPasswordConfirm && 'Password confirmation is required')
            }
            valid={!errors?.newPasswordConfirm && !!getValues().newPasswordConfirm}
          />
          <div className="h-12"></div>
          <div className="w-full px-3 pt-3">
            <Button type="submit" primary fill>
              Submit
            </Button>
            {errors?.token?.message ? (
              <div className="text-red-600 text-center pt-4">{errors?.token?.message}</div>
            ) : null}
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default ResetPasswordPage
