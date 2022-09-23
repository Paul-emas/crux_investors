import { getAccessToken } from '@crux/nextjs-auth0'
import { GetServerSidePropsContext } from 'next'

import {
  contentFeedMap,
  contentHomeMap,
  contentReportsMap,
  contentSearchMap,
  contentVideosListingMap,
  contentVideosMap,
  reportMap,
  videoMap,
} from './acl'
import {
  MappedContentHome,
  MappedContentReports,
  MappedContentVideos,
  MappedContentVideosListing,
  MappedReport,
  MappedVideo,
} from './mappedTypings'
import {
  ContentHomeResponse,
  ContentReportsResponse,
  ContentSingleReportResponse,
  ContentSingleVideoResponse,
  ContentVideosListingResponse,
  ContentVideosResponse,
  FeedResponse,
  GetSubscriptionResponse,
  SearchResult,
  VideoList,
} from './typings'

export const handleErrors = (data: any): void => {
  if (
    data?.message === 'Unable to locate an active subscription for user' ||
    data?.message === 'Inactive subscription' ||
    data?.code === 1
  ) {
    throw new Error('no_subscription')
  }

  if (data?.message === 'TokenExpiredError: jwt expired') {
    throw { code: 'access_token_expired' }
  }
}

export const getReport = async (context: GetServerSidePropsContext): Promise<MappedReport> => {
  const { accessToken } = await getAccessToken(context.req, context.res, {})
  const { slug } = context.query

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/item/report/${slug}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data: ContentSingleReportResponse = await response.json()
  handleErrors(data)

  return { data: reportMap(data), status: response.status, raw: data }
}

export const getVideo = async (context: GetServerSidePropsContext): Promise<MappedVideo> => {
  const { accessToken } = await getAccessToken(context.req, context.res, {})
  const { slug } = context.query

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/item/video/${slug}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data: ContentSingleVideoResponse = await response.json()
  handleErrors(data)

  return { data: videoMap(data), status: response.status, raw: data }
}

export const contentHome = async (
  context: GetServerSidePropsContext
): Promise<MappedContentHome> => {
  const { accessToken } = await getAccessToken(context.req, context.res, {})
  const url = `${process.env.NEXT_PUBLIC_API_URL}/content/home`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data: ContentHomeResponse = await response.json()
  handleErrors(data)

  const status = response.status

  const mapped = contentHomeMap(data)

  return { data: mapped, status, raw: data }
}

export const contentListings = async (
  context: GetServerSidePropsContext,
  type: string,
  id?: string
): Promise<MappedContentVideosListing> => {
  const { accessToken } = await getAccessToken(context.req, context.res, {})
  if (type === 'bookmark') {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/user/bookmark`
    const response = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const data: VideoList = await response.json()
    handleErrors(data)

    return {
      data: contentVideosListingMap({ data }, 'My List'),
      status: response.status,
      raw: data,
    }
  } else {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/content/videos/${type}`)
    url.searchParams.append('limit', '16')
    if (id) {
      url.searchParams.append('id', id)
    }
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const data: ContentVideosListingResponse = await response.json()
    handleErrors(data)

    return {
      data: contentVideosListingMap(data),
      status: response.status,
      raw: data,
    }
  }
}

export const contentFeed = async (
  context: GetServerSidePropsContext,
  feedType: 'objectFeed' | 'curatedFeed' | 'latestFeed',
  feedId?: string
): Promise<MappedContentVideosListing> => {
  const { accessToken } = await getAccessToken(context.req, context.res, {})
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/content/feed/${feedType}`)
  url.searchParams.append('limit', '16')
  if (feedId) {
    url.searchParams.append('id', feedId)
  }
  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data: FeedResponse = await response.json()
  handleErrors(data)

  return { data: contentFeedMap(data), status: response.status, raw: data }
}

export const contentSearch = async (
  context: GetServerSidePropsContext,
  term: string
): Promise<MappedContentVideosListing> => {
  const { accessToken } = await getAccessToken(context.req, context.res, {})
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/content/search`)

  url.searchParams.append('term', term)

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data: SearchResult = await response.json()
  handleErrors(data)

  return { data: contentSearchMap(data), status: response.status }
}

export const contentVideo = async (
  context: GetServerSidePropsContext
): Promise<MappedContentVideos> => {
  const { accessToken } = await getAccessToken(context.req, context.res, {})

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/videos`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data: ContentVideosResponse = await response.json()
  handleErrors(data)

  const mapped = contentVideosMap(data)

  return { data: mapped, status: response.status, raw: data }
}

export const contentReports = async (
  context: GetServerSidePropsContext
): Promise<MappedContentReports> => {
  const { accessToken } = await getAccessToken(context.req, context.res, {})

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/reports`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data: ContentReportsResponse = await response.json()
  handleErrors(data)

  return { data: contentReportsMap(data), status: response.status, raw: data }
}

export const fetchSubscription = async (
  context: GetServerSidePropsContext
): Promise<{ data: GetSubscriptionResponse; status: number; raw: any }> => {
  const { accessToken } = await getAccessToken(context.req, context.res, {})

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/subscription`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data = (await response.json()) as GetSubscriptionResponse

  return { data, status: response.status, raw: data }
}
