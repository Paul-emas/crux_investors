import { SubscribeResponse } from '@/store/auth'
import { fetchSubscription } from '@/utils/api'
import { withErrorHandler } from '@/utils/withErrorHandler'
import Layout from '@components/Layout'
import ProgressSteps from '@components/ProgressSteps'
import StepSwitch from '@components/Registration/StepSwitch'
import { RegistrationData } from '@components/Registration/types'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Cookies from 'cookies'

type RegisterProps = {
  rejoin?: boolean
}

const RegisterPage: React.FC<RegisterProps> = (props) => {
  const router = useRouter()

  const [step, setStep] = React.useState(0)
  const [rejoining, setRejoining] = React.useState(props.rejoin || false)
  const [form, setForm] = React.useState<RegistrationData>({} as RegistrationData)
  const [progress, setProgress] = React.useState(0)

  useEffect(() => {
    if (router.query.cf && step === 0) {
      setRejoining(true)
    }
  }, [router.query?.cf, setStep, step, setRejoining])

  const onData = React.useCallback(
    (key, data) => {
      setForm({
        ...form,
        [key]: data,
      })
    },
    [form, setForm]
  )

  const onDone = React.useCallback(
    (data: SubscribeResponse) => {
      if (data.body?.subscription?.credentials?.accessToken) {
        router.push(
          `/api/auth/callback?code=token:${data.body?.subscription?.credentials?.accessToken}`
        )
      } else {
        router.push('/api/auth/login')
      }
    },
    [router]
  )

  return (
    <Layout>
      <Head>
        <title>Welcome to Crux Investor</title>
      </Head>
      <div className="flex flex-col items-center pt-18">
        {step < 2 ? <ProgressSteps current={step} progress={progress} /> : null}
        <StepSwitch
          data={form}
          onData={onData}
          onDone={onDone}
          setProgress={setProgress}
          setStep={setStep}
          step={step}
          rejoinFlow={rejoining}
        />
      </div>
    </Layout>
  )
}

export default RegisterPage

export const getServerSideProps = withErrorHandler(
  async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<RegisterProps>> => {
    try {
      const data = await fetchSubscription(context)
      if (data?.data?.subscription?.active) {
        const cookies = new Cookies(context.req, context.res)
        cookies.set('canceled')
        return {
          redirect: { destination: '/', permanent: false },
        }
      }
    } catch (e) {
      if (e.code !== 'invalid_session') {
        console.error(e)
      }
    }
    return { props: { rejoin: context.query.cf ? true : false } }
  }
)
