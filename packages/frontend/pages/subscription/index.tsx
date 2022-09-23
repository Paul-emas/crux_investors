import React from 'react'
import Head from 'next/head'
import { withErrorHandler } from '@/utils/withErrorHandler'
import { UserProfile, withPageAuthRequired } from '@crux/nextjs-auth0'
import Layout from '@components/Layout'
import Cookies from 'cookies'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import Billing from '@/components/ProfileSettings/Billing'
import CreditCard from '@/components/ProfileSettings/CreditCard'

dayjs.extend(LocalizedFormat)

type AccountEmailPageProps = { user: UserProfile }

const AccountEmailPage: React.FC<AccountEmailPageProps> = () => {
  return (
    <Layout className="w-full xs:max-w-xsm mx-auto">
      <Head>
        <title>Subscriptions</title>
      </Head>
      <div className="pt-6">
        <div className="text-3.5xl xs:text-4.5xl px-4 xs:px-0 ml-0 mb-6 font-aeonik">
          Subscription
        </div>
        <Billing>
          <CreditCard />
        </Billing>
      </div>
    </Layout>
  )
}

export default AccountEmailPage

export const getServerSideProps = withErrorHandler(
  async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<AccountEmailPageProps>> => {
    const auth: any = await withPageAuthRequired()(context)
    if (!auth?.props?.user) {
      return {
        redirect: {
          destination: `/api/auth/login?rto=${encodeURIComponent(context.resolvedUrl)}`,
          permanent: false,
        },
      }
    } else {
      const cookies = new Cookies(context.req, context.res)
      cookies.set('userEmail', auth?.props?.user?.email || '')
    }
    return { props: { ...auth.props } }
  }
)
