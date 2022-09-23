import { GetSubscriptionResponse } from '@/utils/typings'
import { withErrorHandler } from '@/utils/withErrorHandler'
import { UserProfile, withPageAuthRequired } from '@crux/nextjs-auth0'
import Button from '@components/Button'
import Layout from '@components/Layout'
import Cookies from 'cookies'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'

dayjs.extend(LocalizedFormat)

type MembershipPageProps = { user: UserProfile }

const CancelText: React.FC<{ date: string }> = ({ date }) => (
  <div className="">
    Click ‘Confirm’ below to cancel your membership. Your cancellation will be
    <br />
    effective at the end of your current billing period on{' '}
    <strong className="text-neutral-900">{date}</strong>.
    <br />
    To rejoin just ‘Sign up’ again - we’ll save your details.
  </div>
)

const ReactivateText: React.FC<{ date: string }> = ({ date }) => (
  <div className="">
    Click ‘Confirm’ below to switch to re-activate your membership. Your
    <br />
    subscription will auto-renew and you will be charged on{' '}
    <strong className="text-neutral-900">{date}</strong>.
  </div>
)

const SwitchText: React.FC<{ date: string }> = ({ date }) => (
  <div className="">
    Click ‘Confirm’ below to switch to annual billing at $299/yr. Your new billing
    <br />
    cycle will be effective at the end of your current billing period on{' '}
    <strong className="text-neutral-900">{date}</strong>.<br />
    Once you’ve chosen annual billing, you can’t go back to monthly.
  </div>
)

const MembershipPage: React.FC<MembershipPageProps> = () => {
  const router = useRouter()
  const [periodEnd, setPeriodEnd] = useState('')

  useEffect(() => {
    ;(async () => {
      const rs = await fetch('/api/crux/user/subscription', {
        method: 'GET',
      })
      const data = (await rs.json()) as GetSubscriptionResponse
      setPeriodEnd(dayjs(data?.subscription?.stripe?.currentPeriodEnd).format('LL'))
    })()
  }, [setPeriodEnd])

  const cancelSubscription = useCallback(async () => {
    const rs = await fetch('/api/crux/user/subscription', {
      method: 'DELETE',
    })
    if (rs.status !== 200) {
      alert((await rs.json()).message)
    } else {
      router.back()
    }
  }, [router])

  const switchSubscription = useCallback(async () => {
    const rs = await fetch('/api/crux/user/subscription', {
      method: 'PUT',
      body: JSON.stringify({ action: 'switch_annual' }),
    })
    if (rs.status !== 200) {
      alert((await rs.json()).message)
    } else {
      router.back()
    }
  }, [router])

  const reactivateSubscription = useCallback(async () => {
    const rs = await fetch('/api/crux/user/subscription', {
      method: 'PUT',
      body: JSON.stringify({
        action: 'reactivate',
      }),
    })
    if (rs.status !== 200) {
      alert((await rs.json()).message)
    } else {
      router.back()
    }
  }, [router])

  const goBack = useCallback(() => {
    router.back()
  }, [router])

  const cancelButton = (
    <Button onClick={cancelSubscription} error>
      Confirm cancellation
    </Button>
  )

  const confirmButton = (
    <Button onClick={switchSubscription} info>
      Confirm
    </Button>
  )

  const reactivateButton = (
    <Button onClick={reactivateSubscription} info>
      Confirm
    </Button>
  )

  let confirmText = null
  let actionButton = null
  let header = ''

  if (router.query?.type === 'Cancel') {
    confirmText = <CancelText date={periodEnd} />
    actionButton = cancelButton
    header = 'Cancel Your Membership?'
  }

  if (router.query?.type === 'Reactivate') {
    confirmText = <ReactivateText date={periodEnd} />
    actionButton = reactivateButton
    header = 'Re-activate Membership?'
  }

  if (router.query?.type === 'Switch') {
    confirmText = <SwitchText date={periodEnd} />
    actionButton = confirmButton
    header = 'Switch to Annual Billing?'
  }

  return (
    <Layout>
      <Head>
        <title>Membership {router.query?.type}</title>
      </Head>
      <div className="text-center pt-32">
        <div className="font-title text-header mb-6 text-neutral-800">{header}</div>
        <div className="text-base text-neutral-600">{confirmText}</div>
      </div>
      <div className="flex justify-center mt-6">
        {actionButton}
        <Button onClick={goBack} secondary className="ml-4">
          Go back
        </Button>
      </div>
    </Layout>
  )
}

export default MembershipPage

export const getServerSideProps = withErrorHandler(
  async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<MembershipPageProps>> => {
    const auth: any = await withPageAuthRequired()(context)
    if (!auth?.props?.user) {
      return {
        redirect: { destination: '/api/auth/login', permanent: false },
      }
    } else {
      const cookies = new Cookies(context.req, context.res)
      cookies.set('userEmail', auth?.props?.user?.email || '')
    }
    return { props: { ...auth.props } }
  }
)
