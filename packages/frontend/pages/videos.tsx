import FeedCarousel from '@/components/Listing/FeedCarousel'
import { getFeedUrl } from '@/utils/gen'
import { withErrorHandler } from '@/utils/withErrorHandler'
import Layout from '@components/Layout'
import Hero from '@components/Listing/Hero'
import { withPageAuthRequired } from '@crux/nextjs-auth0'
import { contentVideo } from '@utils/api'
import { MappedContentVideos } from '@utils/mappedTypings'
import classNames from 'classnames'
import Cookies from 'cookies'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Head from 'next/head'
import React from 'react'

type VideoProps = {
  data: MappedContentVideos
}

const VideoPage: React.FC<VideoProps> = (props) => {
  const videosData = props?.data?.data

  if (props?.data?.status !== 200) {
    return (
      <Layout>
        <div className="text-center text-2xl pt-6">Error {props.data.status}</div>
      </Layout>
    )
  }

  if (!videosData?.banner?.videoId && !videosData?.feed?.length) {
    return (
      <Layout>
        <Head>
          <title>Videos</title>
        </Head>
        <div className="text-center text-2xl pt-6">No videos yet</div>
      </Layout>
    )
  }

  let latestFeed = null
  const otherFeed = []
  videosData?.feed.forEach((feed) => {
    if (feed.type === 'latestFeed') {
      latestFeed = feed
    } else {
      otherFeed.push(feed)
    }
  })

  return (
    <Layout>
      <Head>
        <title>Videos</title>
      </Head>
      {videosData?.banner?.videoId ? (
        <Hero
          header={videosData?.banner?.title}
          href={`/v/${videosData.banner.videoId}`}
          image={videosData?.banner?.splashImageUrl || videosData?.banner?.heroImageUrl}
        />
      ) : null}
      <FeedCarousel
        className={classNames({ 'pt-18': !videosData?.banner })}
        overlap={!!videosData?.banner}
        videos={latestFeed?.videos}
        title={latestFeed?.title}
        href={`/latest/${latestFeed?.id}`}
      />
      {otherFeed?.map((feed, idx) => (
        <FeedCarousel
          key={idx}
          className="mt-15"
          videos={feed?.videos}
          title={feed?.title}
          href={getFeedUrl(feed)}
        />
      ))}
    </Layout>
  )
}

export default VideoPage

export const getServerSideProps = withErrorHandler(
  async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<VideoProps>> => {
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

    const data = await contentVideo(context)

    return { props: { ...auth.props, data } }
  }
)
