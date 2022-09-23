import { withErrorHandler } from '@/utils/withErrorHandler'
import { withPageAuthRequired } from '@crux/nextjs-auth0'
import Layout from '@components/Layout'
import FeaturedReport from '@components/Listing/FeaturedReport'
import FeaturedSection from '@components/Listing/FeaturedSection'
import { contentReports } from '@utils/api'
import { MappedContentReports } from '@utils/mappedTypings'
import Cookies from 'cookies'
import dayjs from 'dayjs'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Head from 'next/head'
import React from 'react'

type ReportsPageProps = {
  data: MappedContentReports
}

const ReportsPage: React.FC<ReportsPageProps> = (props) => {
  const reportsData = props?.data?.data?.reports

  if (props?.data?.status !== 200) {
    return (
      <Layout>
        <div className="text-center text-2xl pt-6">Error {props.data.status}</div>
      </Layout>
    )
  }

  if (!reportsData?.length) {
    return (
      <Layout>
        <Head>
          <title>Reports</title>
        </Head>
        <div className="text-center text-2xl pt-6">No reports yet</div>
      </Layout>
    )
  }

  const reports = reportsData.map((report, idx) => (
    <FeaturedReport
      key={idx}
      title={report.companyName}
      subtitle={
        report?.createdAt || report?.month || report?.publishedAt
          ? dayjs(report?.createdAt || report?.month || report?.publishedAt).format('MMMM YYYY')
          : ''
      }
      image={report.heroImageUrl}
      href={`/memos/${report?.reportId}`}
      fallbackColor={report?.heroColor}
    />
  ))

  const [featuredReport, ...otherReports] = reports
  return (
    <Layout>
      <Head>
        <title>Memos</title>
      </Head>
      <FeaturedSection>{featuredReport}</FeaturedSection>
      <div className="px-7 mb-10 md:mb-0 sm:px-8 lg:px-14">{otherReports}</div>
    </Layout>
  )
}

export default ReportsPage

export const getServerSideProps = withErrorHandler(
  async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<ReportsPageProps>> => {
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

    const data = await contentReports(context)

    return { props: { ...auth.props, data } }
  }
)
