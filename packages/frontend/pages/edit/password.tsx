import { withErrorHandler } from '@/utils/withErrorHandler'
import { UserProfile, withPageAuthRequired } from '@crux/nextjs-auth0'
import Layout from '@components/Layout'
import Cookies from 'cookies'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Head from 'next/head'
import React from 'react'
import UpdatePassword from '@/components/ProfileSettings/UpdatePassword'

dayjs.extend(LocalizedFormat)

type AccountPasswordPageProps = { user: UserProfile }

const AccountPasswordPage: React.FC<AccountPasswordPageProps> = () => {
  return (
    <Layout className="px-4 xs:px-0 w-full xs:w-103 max-w-103 mx-auto">
      <Head>
        <title>Change Password</title>
      </Head>
      <div className="pt-6">
        <div className="font-title text-2xl xl:text-header ml-0 mb-6">
          <span className="hidden xs:block">Change password</span>
          <span className="block xs:hidden">Update password</span>
        </div>
        <UpdatePassword />
      </div>
    </Layout>
  )
}

export default AccountPasswordPage

export const getServerSideProps = withErrorHandler(
  async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<AccountPasswordPageProps>> => {
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
