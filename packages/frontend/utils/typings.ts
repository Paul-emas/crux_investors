import { Document } from '@contentful/rich-text-types/dist/types'

export interface DColor {
  r: string
  g: string
  b: string
}

export interface HeroImage {
  dColor?: DColor
  url: string
}

export interface Topic {
  id: string
  name: string
}

export interface MarketDataMeta {
  symbol: string
  interval: string
  currency: string
  exchange_timezone: string
  exchange: string
  type: string
}

export interface MarketDataValue {
  datetime: string
  open: string
  high: string
  low: string
  close: string
  volume: string
}

export interface MarketData {
  status?: string
  meta: MarketDataMeta
  values: MarketDataValue[]
}
export interface Company {
  id: string
  name: string
  exchange?: string
  symbol?: string
  marketData?: MarketData
}

export interface Show {
  id: string
  name: string
}

export interface VideoStream {
  aspectRatio: string
  duration: number
  url: string
}

export interface Guest {
  id: string
  name: string
}
export interface Video {
  company: Company
  description: string
  guests: Guest[]
  heroImage: HeroImage
  id: string
  name: string
  originalPublishedAt: string
  show: Show
  splashImage: HeroImage
  topics: Topic[]
  video: VideoStream
  videoPreview: VideoStream
}

export interface BannerVideo {
  video: Video
  display: string
}

export interface Report {
  id: string
  title: string
  heroImage: HeroImage
  pros?: string[]
  cons?: string[]
  content: Document
  company: Company
  publishedAt: string
  createdAt: string
  month?: string
}

export interface FeedObject {
  objectType: string
  objectId: string
}

export interface VideoList {
  object: {
    id: string
    type: string
    name: string
  }
  videos: Video[]
}

export interface SearchResult {
  results: {
    type: string
    name: string
    videos: Video[]
  }
}

export interface Feed {
  title: string
  type?: 'objectFeed' | 'curatedFeed' | 'latestFeed'
  id?: string
  data: VideoList
}

export interface Item {
  bannerVideo: BannerVideo
  report: Report
  feed: Feed
}

export interface ContentHomeResponse {
  items: Item[]
}

export interface ContentSingleReportResponse {
  item: Report
}

export interface ContentSingleVideoResponse {
  item: Video
}

export interface ContentReportsResponse {
  items: Report[]
}

export interface ContentVideosResponse {
  items: {
    bannerVideo: BannerVideo
    feeds: Feed[]
  }
}

export interface ContentVideosListingResponse {
  data: VideoList
}

export interface FeedResponse {
  feed: Feed
}
export interface Card {
  _id: string
  brand: string
  last4: string
  expiryMonth: string
  expiryYear: string
}

export interface GetUserResponse {
  _id: string
  name: string
  picture: string
  email: string
  bookmarks: string[]
  cards: Card[]
  isPercentUser: boolean
}

export interface Stripe {
  currentPeriodStart: Date
  currentPeriodEnd: Date
}

export interface Subscription {
  _id: string
  active: boolean
  canceledAt: string
  createdAt: Date
  id: string
  stripe: Stripe
  type: 'monthly' | 'yearly'
}

export interface GetSubscriptionResponse {
  subscription: Subscription
}
