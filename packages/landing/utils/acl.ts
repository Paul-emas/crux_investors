import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

import {
  ContentHomeResponse,
  ContentReportsResponse,
  ContentSingleReportResponse,
  ContentSingleVideoResponse,
  ContentVideosListingResponse,
  ContentVideosResponse,
  FeedResponse,
} from './typings'

export const contentReportsMap = (data: ContentReportsResponse) => {
  const rs = { reports: [] }

  data?.items?.forEach((report) => {
    rs.reports.push({
      reportId: report?.id || null,
      content: documentToHtmlString(report?.content) || null,
      companyName: report?.company?.name || null,
      companyId: report?.company?.id || null,
      companySymbol: report?.company?.symbol || null,
      companyExchange: report?.company?.exchange || null,
      heroImageUrl: report?.heroImage?.url?.startsWith('//')
        ? `https:${report?.heroImage?.url}`
        : report?.heroImage?.url || null,
      title: report?.title || null,
    })
  })

  return rs
}

export const reportMap = (data: ContentSingleReportResponse) => {
  return {
    reportId: data?.item?.id || null,
    content: documentToHtmlString(data?.item?.content) || null,
    companyName: data?.item?.company?.name || null,
    companyId: data?.item?.company?.id || null,
    companySymbol: data?.item?.company?.symbol || null,
    companyExchange: data?.item?.company?.exchange || null,
    companyMarketData: data?.item?.company?.marketData || null,
    heroImageUrl: data?.item?.heroImage?.url?.startsWith('//')
      ? `https:${data?.item?.heroImage?.url}`
      : data?.item?.heroImage?.url || null,
    title: data?.item?.title || null,
    cons: data?.item?.cons || [],
    pros: data?.item?.pros || [],
  }
}

export const videoMap = (data: ContentSingleVideoResponse) => {
  return {
    videoId: data?.item?.id || null,
    publishedAt: data?.item?.originalPublishedAt || null,
    description: data?.item?.description || null,
    companyName: data?.item?.company?.name || null,
    companyId: data?.item?.company?.id || null,
    companySymbol: data?.item?.company?.symbol || null,
    companyExchange: data?.item?.company?.exchange || null,
    heroImageUrl: data?.item?.heroImage?.url?.startsWith('//')
      ? `https:${data?.item?.heroImage?.url}`
      : data?.item?.heroImage?.url || null,
    showName: data?.item?.show?.name || null,
    showId: data?.item?.show?.id || null,
    topics: data?.item?.topics || null,
    video: data?.item?.video || null,
    videoPreview: data?.item?.videoPreview || null,
  }
}

export const contentVideosMap = (data: ContentVideosResponse) => {
  const rs: any = {
    banner: {},
    feed: [],
  }

  if (data?.items.bannerVideo) {
    const video = data?.items?.bannerVideo?.video
    rs.banner = {
      videoId: video?.id || null,
      publishedAt: video?.originalPublishedAt || null,
      description: video?.description || null,
      companyName: video?.company?.name || null,
      companyId: video?.company?.id || null,
      companySymbol: video?.company?.symbol || null,
      companyExchange: video?.company?.exchange || null,
      heroImageUrl: video?.heroImage?.url?.startsWith('//')
        ? `https:${video?.heroImage?.url}`
        : video?.heroImage?.url || null,
      showName: video?.show?.name || null,
      showId: video?.show?.id || null,
      topics: video?.topics || null,
      video: video?.video || null,
      videoPreview: video?.videoPreview || null,
    }
  }

  if (data?.items?.feeds) {
    const feeds = data?.items?.feeds
    feeds.forEach((feed) => {
      const videos = feed?.videos?.videos
      rs.feed.push({
        title: feed?.title || null,
        type: feed?.type || null,
        id: feed?.id || null,
        videos: videos?.map((v) => ({
          videoId: v?.id || null,
          publishedAt: v?.originalPublishedAt || null,
          description: v?.description || null,
          companyName: v?.company?.name || null,
          companyId: v?.company?.id || null,
          companySymbol: v?.company?.symbol || null,
          companyExchange: v?.company?.exchange || null,
          heroImageUrl: v?.heroImage?.url?.startsWith('//')
            ? `https:${v?.heroImage?.url}`
            : v?.heroImage?.url || null,
          showName: v?.show?.name || null,
          showId: v?.show?.id || null,
          topics: v?.topics || null,
          video: v?.video || null,
          videoPreview: v?.videoPreview || null,
        })),
      })
    })
  }

  return rs
}

export const contentHomeMap = (data: ContentHomeResponse) => {
  const rs: any = {
    banner: {},
    report: {},
    latestFeed: {},
    feed: [],
  }

  data?.items?.forEach((item) => {
    if (item.bannerVideo) {
      const video = item?.bannerVideo?.video
      rs.banner = {
        companyName: video?.company?.name || null,
        companyId: video?.company?.id || null,
        companySymbol: video?.company?.symbol || null,
        companyExchange: video?.company?.exchange || null,
        heroImageUrl: video?.heroImage?.url?.startsWith('//')
          ? `https:${video?.heroImage?.url}`
          : video?.heroImage?.url || null,
        video: video?.video || null,
        videoPreview: video?.videoPreview || null,
        showName: video?.show?.name || null,
        showId: video?.show?.id || null,
        topics: video?.topics || null,
        videoId: video?.id || null,
        publishedAt: video?.originalPublishedAt || null,
        description: video?.description || null,
      }
    } else if (item.report) {
      const report = item?.report
      rs.report = {
        reportId: report?.id || null,
        content: documentToHtmlString(report?.content) || null,
        companyName: report?.company?.name || null,
        companyId: report?.company?.id || null,
        companySymbol: report?.company?.symbol || null,
        companyExchange: report?.company?.exchange || null,
        heroImageUrl: report?.heroImage?.url?.startsWith('//')
          ? `https:${report?.heroImage?.url}`
          : report?.heroImage?.url || null,
        title: report?.title || null,
      }
    } else if (item.feed) {
      const videos = item?.feed?.videos?.videos
      const feed = {
        title: item?.feed?.title || null,
        type: item?.feed?.type || null,
        id: item?.feed?.id || null,
        videos: videos?.map((v) => ({
          videoId: v?.id || null,
          publishedAt: v?.originalPublishedAt || null,
          description: v?.description || null,
          companyName: v?.company?.name || null,
          companyId: v?.company?.id || null,
          companySymbol: v?.company?.symbol || null,
          companyExchange: v?.company?.exchange || null,
          heroImageUrl: v?.heroImage?.url?.startsWith('//')
            ? `https:${v?.heroImage?.url}`
            : v?.heroImage?.url || null,
          showName: v?.show?.name || null,
          showId: v?.show?.id || null,
          topics: v?.topics || null,
          video: v?.video || null,
          videoPreview: v?.videoPreview || null,
        })),
      }
      if (feed.type === 'latestFeed') {
        rs.latestFeed = feed
      } else {
        rs.feed.push(feed)
      }
    }
  })

  return rs
}

export const contentVideosListingMap = (data: ContentVideosListingResponse, title = '') => {
  const rs = {
    title: title || data?.data?.object?.name || null,
    videos:
      data?.data?.videos?.map((v) => ({
        videoId: v?.id || null,
        publishedAt: v?.originalPublishedAt || null,
        description: v?.description || null,
        companyName: v?.company?.name || null,
        companyId: v?.company?.id || null,
        companySymbol: v?.company?.symbol || null,
        companyExchange: v?.company?.exchange || null,
        heroImageUrl: v?.heroImage?.url?.startsWith('//')
          ? `https:${v?.heroImage?.url}`
          : v?.heroImage?.url || null,
        showName: v?.show?.name || null,
        showId: v?.show?.id || null,
        topics: v?.topics || null,
        video: v?.video || null,
        videoPreview: v?.videoPreview || null,
      })) || [],
  }

  return rs
}

export const contentFeedMap = (data: FeedResponse) => {
  const rs = {
    title: data?.feed?.title || null,
    type: data?.feed?.type || null,
    id: data?.feed?.id || null,
    videos: data?.feed?.videos?.videos?.map((v) => ({
      videoId: v?.id || null,
      publishedAt: v?.originalPublishedAt || null,
      description: v?.description || null,
      companyName: v?.company?.name || null,
      companyId: v?.company?.id || null,
      companySymbol: v?.company?.symbol || null,
      companyExchange: v?.company?.exchange || null,
      heroImageUrl: v?.heroImage?.url?.startsWith('//')
        ? `https:${v?.heroImage?.url}`
        : v?.heroImage?.url || null,
      showName: v?.show?.name || null,
      showId: v?.show?.id || null,
      topics: v?.topics || null,
      video: v?.video || null,
      videoPreview: v?.videoPreview || null,
    })),
  }

  return rs
}
