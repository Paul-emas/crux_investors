import Button from '@components/Button'
import Input from '@components/Input'
import Layout from '@components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

type SignInFormData = {
  email: string
  password: string
}

const SignIn: React.FC<unknown> = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/api/auth/login')
  }, [router])

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignInFormData>()

  const onSubmit = handleSubmit(() => {
    // no need to handle this
  })

  return (
    <Layout>
      <div className="flex flex-col items-center pt-18">
        <h1 className="text-neutral-900 text-header text-center font-title">Welcome back</h1>
        <form className="pt-6 flex flex-col items-center pb-8" onSubmit={onSubmit}>
          <Input
            label="Email address"
            {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
            error={
              (errors?.email?.type === 'pattern' && 'Email is incorrect') ||
              (errors?.email && 'Email is required')
            }
            valid={!errors?.email && !!getValues().email}
          />
          <Input
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
          <Link href="/password">
            <a className="pt-1 px-3 text-neutral-500 text-right text-xs w-full">Forgot password?</a>
          </Link>
          <div className="h-12"></div>
          <div className="w-full px-3">
            <Button type="submit" fill primary>
              Sign In
            </Button>
            <Link href="/signup">
              <a>
                <Button fill secondary className="mt-4">
                  Create Your Membership
                </Button>
              </a>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default SignIn
