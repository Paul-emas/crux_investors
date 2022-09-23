import { getAccessToken } from '@auth0/nextjs-auth0'
import { GetServerSidePropsContext } from 'next'

import {
  contentFeedMap,
  contentHomeMap,
  contentReportsMap,
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
  VideoList,
} from './typings'

export const getReport = async (context: GetServerSidePropsContext): Promise<MappedReport> => {
  const { accessToken } = await getAccessToken(context.req, context.res, {})
  const { slug } = context.query

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/item/report/${slug}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data: ContentSingleReportResponse = await response.json()

  return { data: reportMap(data), status: response.status }
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

  return { data: videoMap(data), status: response.status }
}

export const contentHome = async (
  context: GetServerSidePropsContext
): Promise<MappedContentHome> => {
  const { accessToken } = await getAccessToken(context.req, context.res, {})

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/home`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data: ContentHomeResponse = await response.json()

  const mapped = contentHomeMap(data)

  return { data: mapped, status: response.status }
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

    return {
      data: contentVideosListingMap({ data }, 'My Bookmarks'),
      status: response.status,
    }
  } else {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/content/videos/${type}${id ? `?id=${id}` : ''}`
    const response = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const data: ContentVideosListingResponse = await response.json()

    return {
      data: contentVideosListingMap(data),
      status: response.status,
    }
  }
}

export const contentFeed = async (
  context: GetServerSidePropsContext,
  feedType: 'objectFeed' | 'curatedFeed' | 'latestFeed',
  feedId?: string
): Promise<MappedContentVideosListing> => {
  const { accessToken } = await getAccessToken(context.req, context.res, {})
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/content/feed/${feedType}${
    feedId ? `?id=${feedId}` : ''
  }`
  const response = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data: FeedResponse = await response.json()

  return { data: contentFeedMap(data), status: response.status }
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

  const mapped = contentVideosMap(data)

  return { data: mapped, status: response.status }
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

  return { data: contentReportsMap(data), status: response.status }
}
