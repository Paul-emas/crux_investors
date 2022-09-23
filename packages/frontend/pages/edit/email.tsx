import { withErrorHandler } from '@/utils/withErrorHandler'
import { UserProfile, withPageAuthRequired } from '@crux/nextjs-auth0'
import Layout from '@components/Layout'
import Cookies from 'cookies'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Head from 'next/head'
import React from 'react'
import EditEmail from '@/components/ProfileSettings/EditEmail'

dayjs.extend(LocalizedFormat)

type AccountEmailPageProps = { user: UserProfile }

const AccountEmailPage: React.FC<AccountEmailPageProps> = () => {
  return (
    <Layout className="px-4 xs:px-0 w-full xs:w-103 max-w-103 mx-auto">
      <Head>
        <title>Change Email</title>
      </Head>
      <div className="pt-6">
        <div className="font-title text-3xl xl:text-header ml-0 mb-6">Change email</div>
        <EditEmail />
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
