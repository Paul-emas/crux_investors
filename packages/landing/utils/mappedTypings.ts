import { MarketData, VideoStream } from './typings'

export interface Topic {
  id: string
  name: string
}

export interface Banner {
  companyName: string
  companyId: string
  companySymbol: string
  companyExchange: string
  heroImageUrl: string
  showName: string
  showId: string
  topics: Topic[]
  videoId: string
  video: VideoStream
  videoPreview: VideoStream
}

export interface Report {
  reportId: string
  content: string
  companyName: string
  companyId: string
  companySymbol: string
  companyExchange: string
  companyMarketData: MarketData
  heroImageUrl: string
  title: string
  cons?: string[]
  pros?: string[]
}

export interface Video {
  companyExchange: string
  companyId: string
  companyName: string
  companySymbol: string
  description: string
  heroImageUrl: string
  publishedAt: string
  showId: string
  showName: string
  topics: Topic[]
  videoId: string
  video: VideoStream
  videoPreview: VideoStream
}

export interface Feed {
  title: string
  id: string
  type: 'objectFeed' | 'curatedFeed' | 'latestFeed'
  videos: Video[]
}

export interface MappedContentHome {
  data: {
    banner: Banner
    report: Report
    latestFeed: Feed
    feed: Feed[]
  }
  status: number
  raw?: any
}

export interface MappedReport {
  data: Report
  status: number
  raw?: any
}

export interface MappedVideo {
  data: Video
  status: number
  raw?: any
}

export interface MappedContentVideos {
  data: {
    banner: Banner
    feed: Feed[]
  }
  status: number
  raw?: any
}

export interface MappedContentVideosListing {
  data: {
    title?: string
    id?: string
    type?: string
    videos: Video[]
  }
  status: number
  raw?: any
}

export interface MappedContentReports {
  data: { reports: Report[] }
  status: number
  raw?: any
}
