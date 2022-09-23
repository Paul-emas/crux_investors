import ConsPros from '@/components/Reports/ConsPros'
import { withErrorHandler } from '@/utils/withErrorHandler'
import ToC from '@/components/Reports/ToC'
import Layout from '@components/Layout'
import Hero from '@components/Listing/Hero'
import GraphReport from '@components/Reports/GraphReport'
import { withPageAuthRequired } from '@crux/nextjs-auth0'
import { getReport } from '@utils/api'
import { MappedReport } from '@utils/mappedTypings'
import Cookies from 'cookies'
import dayjs from 'dayjs'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

type ReportsSlugPageProps = {
  data: MappedReport
}

const ReportsSlugPage: React.FC<ReportsSlugPageProps> = (props) => {
  const report = props?.data?.data

  useEffect(() => {
    const reportData = {
      id: report.reportId,
      title: report.title,
    }
    ;(global as any)?.analytics?.track('Memo Viewed', reportData)
  }, [report.reportId, report.title])

  const [contentRef, setContentRef] = useState<HTMLDivElement>(null)

  if (props?.data?.status !== 200) {
    return (
      <Layout>
        <div className="text-center text-2xl pt-6">Error {props.data.status}</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>{report?.title}</title>
      </Head>
      <Hero header={report?.companyName} href="/" image={report?.heroImageUrl} report />
      <div className="relative px-6 sm:px-9 lg:px-0 lg:container mx-auto">
        <div className="w-full md:w-160 mx-auto flex flex-col text-neutral-600 text-base">
          <div className="flex justify-between items-center mt-0.5">
            <div className="text-3.5xl text-neutral-035 font-title font-medium">
              {report?.companyName}
            </div>
          </div>

          <div className="text-sm text-neutral-055 mt-1">
            {report?.createdAt || report?.month || report?.publishedAt
              ? dayjs(report?.createdAt || report?.month || report?.publishedAt).format(
                  'D MMMM YYYY'
                )
              : ''}
          </div>
          <div className="pt-10">
            {report?.companyMarketData ? (
              <GraphReport data={report?.companyMarketData} companySymbol={report?.companySymbol} />
            ) : null}
          </div>
          <div className="grid-cols-2">
            <ConsPros type="pros" list={report?.pros} />
            <ConsPros type="cons" list={report?.cons} />
          </div>
          <div className="pt-10 articleContent tracking-tight">
            <div ref={(ref) => setContentRef(ref)} className="whitespace-normal"></div>
          </div>
          <div className="absolute bottom-0 top-0 w-1/4 hidden lg:block">
            <ToC content={contentRef} html={report?.content} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ReportsSlugPage

export const getServerSideProps = withErrorHandler(
  async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<ReportsSlugPageProps>> => {
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

    const data = await getReport(context)

    return { props: { ...auth.props, data } }
  }
)
