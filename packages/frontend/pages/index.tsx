import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { getFeedUrl } from '@/utils/gen'
import { withErrorHandler } from '@/utils/withErrorHandler'
import Layout from '@components/Layout'
import Hero from '@components/Listing/Hero'
import { useStore } from '@components/StoreProvider'
import FeedCarousel from '@/components/Listing/FeedCarousel'
import { withPageAuthRequired } from '@crux/nextjs-auth0'
import { contentHome, contentReports } from '@utils/api'
import { MappedContentHome, MappedContentReports } from '@utils/mappedTypings'
import classNames from 'classnames'
import Cookies from 'cookies'
import { observer } from 'mobx-react-lite'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

type HomeProps = {
  data: MappedContentHome
  reports: MappedContentReports
}

const Home: React.FC<HomeProps> = observer((props) => {
  const homeData = props?.data?.data
  const reportsData = props?.reports?.data

  const router = useRouter()
  const store = useStore()

  useEffect(() => {
    if (location.search.includes('wel')) {
      ;(global as any)?.analytics?.track('Log in')
      history.replaceState('Home', '/', '/')
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      const rs = await store.getBookmarks()
      if (rs?.error === 're-join') {
        router.push('/signup?cf=1')
      }
    })()
  }, [store, router])

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
        <title>Home</title>
      </Head>
      {homeData?.banner ? (
        <Hero
          header={homeData?.banner?.title}
          href={`/v/${homeData.banner.videoId}`}
          image={homeData?.banner?.splashImageUrl || homeData?.banner?.heroImageUrl}
        />
      ) : null}
      <FeedCarousel
        className={classNames({ 'pt-18': !homeData?.banner })}
        overlap={!!homeData?.banner}
        videos={homeData?.latestFeed?.videos}
        title={homeData?.latestFeed?.title}
        href={`/latest/${homeData?.latestFeed?.id}`}
      />
      <div className="mt-11">
        <FeedCarousel
          className="mt-4"
          type="report"
          caption="Our analysts’ favourite stock each month"
          title="Memos"
          reports={reportsData.reports}
        />
      </div>
      {homeData?.feed?.map((feed, idx) => (
        <FeedCarousel
          key={idx}
          className="mt-4"
          videos={feed?.videos}
          title={feed?.title}
          href={getFeedUrl(feed)}
        />
      ))}
    </Layout>
  )
})

export default Home

export const getServerSideProps = withErrorHandler(
  async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<HomeProps>> => {
    const auth: any = await withPageAuthRequired()(context)

    if (!auth?.props?.user) {
      return {
        redirect: { destination: '/api/auth/login', permanent: false },
      }
    } else {
      const cookies = new Cookies(context.req, context.res)
      cookies.set('userEmail', auth?.props?.user?.email || '')
    }

    const data = await contentHome(context)
    const reports = await contentReports(context)

    return { props: { ...auth.props, reports, data } }
  }
)
