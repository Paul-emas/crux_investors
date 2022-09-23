/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Button from '@/components/Button'
import { contentFeedMap, contentVideosListingMap } from '@/utils/acl'
import { listingsMap } from '@/utils/constants'
import { withErrorHandler } from '@/utils/withErrorHandler'
import Layout from '@components/Layout'
import { withPageAuthRequired } from '@crux/nextjs-auth0'
import { contentFeed, contentListings } from '@utils/api'
import { genCards } from '@utils/gen'
import { MappedContentVideosListing } from '@utils/mappedTypings'
import algoliaSearch from 'algoliasearch/lite'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'

const searchClient = algoliaSearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
)

const HITS_PER_PAGE = 20

type ListingsPageProps = {
  data: MappedContentVideosListing
}

const algoliaFetch = async (term, page = 0) => {
  const result = await searchClient.search([
    {
      query: term,
      indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME,
      params: { filters: 'type:video', hitsPerPage: HITS_PER_PAGE, page },
    },
  ])

  const url = new URL(`/api/crux/content/videos/list`, `${location.protocol}//${location.host}/`)

  url.searchParams.append('name', term)
  if (!result?.results?.[0]?.hits?.length) {
    return { data: null, hits: [] }
  }
  result?.results?.[0]?.hits.forEach((hit) => {
    url.searchParams.append('ids', hit.objectID)
  })

  const rs = await fetch(url.toString(), {
    method: 'GET',
  })

  const data = contentVideosListingMap(await rs.json())
  return { data, hits: result?.results?.[0]?.hits }
}

const ListingsPage: React.FC<ListingsPageProps> = (props) => {
  const router = useRouter()

  const type = listingsMap[router?.query?.listing?.[0] as string]
  const feedId = router?.query?.listing?.[1] || ''
  const term = router.query.q as string

  const [videos, setVideos] = useState(props?.data?.data?.videos || [])
  const [loading, setLoading] = useState(false)
  const [endOfList, setEndOfList] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (type !== 'search') {
        return
      }
      setLoading(true)
      const { data, hits } = await algoliaFetch(term)
      if (!hits?.length) {
        setVideos([])
        setLoading(false)
        return
      }
      if (data?.videos?.length) {
        setVideos([...data.videos])
      }
      setLoading(false)
    })()
  }, [router.query.q, setLoading])

  useEffect(() => {
    setVideos(props?.data?.data?.videos)
  }, [setVideos, props?.data?.data?.videos])

  const loadMore = useCallback(async () => {
    if (loading || endOfList) {
      return
    }

    if (type === 'search') {
      const nextPage = Math.ceil(videos.length / HITS_PER_PAGE)
      setLoading(true)

      const { data, hits } = await algoliaFetch(term, nextPage)
      if (hits.length < HITS_PER_PAGE) {
        setEndOfList(true)
      }
      setVideos([...videos, ...(data?.videos || [])])
      setLoading(false)
      return
    }

    const contentType = ['objectFeed', 'curatedFeed', 'latestFeed'].includes(type)
      ? 'feed'
      : 'videos'

    const url = new URL(
      `/api/crux/content/${contentType}/${type}`,
      `${location.protocol}//${location.host}/`
    )

    url.searchParams.append('id', feedId)
    url.searchParams.append('limit', '16')
    url.searchParams.append('skip', videos.length.toString())

    setLoading(true)

    const rs = await fetch(url.toString(), {
      method: 'GET',
    })

    const data =
      contentType === 'feed'
        ? contentFeedMap(await rs.json())
        : contentVideosListingMap(await rs.json())

    if (data?.videos?.length) {
      setVideos([...(videos || []), ...data.videos])
    } else {
      setEndOfList(true)
    }
    setLoading(false)
  }, [loading, type, feedId, videos, setEndOfList])

  useEffect(() => {
    const onScroll = (): void => {
      const sc = document.scrollingElement
      if (!sc) return

      if (sc.scrollHeight - sc.clientHeight - sc.scrollTop <= 530) {
        loadMore()
      }
    }

    document.addEventListener('scroll', onScroll)
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [loadMore])

  const videoCards = genCards('video', videos || [])
  const title = props?.data?.data?.title || router.query.q || router.query.t || ''

  let content = null

  if (!videos?.length && loading) {
    content = (
      <div
        className={`${
          type !== 'search' ? 'mt-6' : 'mt-11'
        } grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3.5xl:grid-cols-5 gap-8`}
      >
        {new Array(20).fill(null).map((_, idx) => (
          <div key={idx} className="h-44 bg-neutral-075 rounded-xl animate-pulse"></div>
        ))}
      </div>
    )
  } else if (videos?.length) {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3.5xl:grid-cols-5 gap-8 mt-11">
        {videoCards}
      </div>
    )
  } else {
    content = (
      <>
        {type === 'bookmark' ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-neutral-035 w-full text-center px-4 xzs:px-3 xxzs:px-2.5 xxs:px-0 lg:px-14">
            <h2 className="text-2.5xl font-title">My List is empty</h2>
            <p className="mt-3 font-normal xxs:max-w-md xxs:px-0 mx-auto text-md">
              Create a watch list of episodes by adding them to Saved.
            </p>
            <div className="flex justify-center mt-3">
              <Button
                customPx
                radius="large"
                size="small"
                secondary
                className="w-35 min-w-35 text-xsm"
              >
                Discover episodes{' '}
              </Button>
            </div>
          </div>
        ) : null}
      </>
    )
  }

  return (
    <Layout>
      <Head>{type === 'search' ? <title>Search: {title}</title> : <title>{title}</title>}</Head>
      <div className={`${type !== 'search' && 'pt-12'} px-4 xxs:px-6 sm:px-9 lg:px-14`}>
        {type !== 'search' && (
          <h1 className="capitalize font-aeonik text-3.5xl xs:text-4.5xl">{title}</h1>
        )}
        {content}
      </div>
    </Layout>
  )
}

export default ListingsPage

export const getServerSideProps = withErrorHandler(
  async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<ListingsPageProps>> => {
    const auth: any = await withPageAuthRequired()(context)

    const type = listingsMap[context?.query?.listing?.[0] as string]

    if (!type) {
      return {
        redirect: { destination: '/404', permanent: false },
      }
    }

    if (!auth?.props?.user) {
      return {
        redirect: {
          destination: `/api/auth/login?rto=${encodeURIComponent(context.resolvedUrl)}`,
          permanent: false,
        },
      }
    }

    const slug = context?.query?.listing?.[1] || ''

    if (
      type === 'bookmark' ||
      type === 'show' ||
      type === 'topic' ||
      type === 'company' ||
      type === 'guest'
    ) {
      const data = (await contentListings(context, type, slug as string)) || []
      return { props: { ...auth.props, data } }
    } else if (type === 'search') {
      if (!context?.query?.q) {
        return {
          redirect: { destination: '/', permanent: false },
        }
      }
      return { props: { ...auth.props, data: {} } }
    } else {
      const data = (await contentFeed(context, type as any, slug as string)) || []
      return { props: { ...auth.props, data } }
    }
  }
)
