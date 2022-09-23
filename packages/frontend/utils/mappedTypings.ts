import { MarketData, VideoStream } from './typings'

export interface Topic {
  id: string
  name: string
}

export interface Banner {
  companyExchange: string
  companyId: string
  companyName: string
  companySymbol: string
  splashImageUrl?: string
  heroImageUrl: string
  showId: string
  showName: string
  title: string
  topics: Topic[]
  video: VideoStream
  videoId: string
  videoPreview: VideoStream
  splashColor?: string
  heroColor?: string
}

export interface Report {
  reportId: string
  publishedAt: string
  month: string
  createdAt: string
  content: string
  companyName: string
  companyId: string
  companySymbol: string
  companyExchange: string
  companyMarketData: MarketData
  heroImageUrl: string
  heroColor: string
  title: string
  cons?: string[]
  pros?: string[]
}

export interface Guest {
  id: string
  name: string
}

export interface Video {
  companyExchange: string
  companyId: string
  companyName: string
  companySymbol: string
  description: string
  guests: Guest[]
  heroImageUrl: string
  publishedAt: string
  showId: string
  showName: string
  title: string
  topics: Topic[]
  video: VideoStream
  videoId: string
  videoPreview: VideoStream
  splashColor?: string
  heroColor?: string
}

export interface Feed {
  title: string
  id: string
  type: 'objectFeed' | 'curatedFeed' | 'latestFeed'
  videos: Video[]
  object: {
    id: string
    type: string
    name: string
  }
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
