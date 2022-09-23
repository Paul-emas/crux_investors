import { Document } from '@contentful/rich-text-types/dist/types'

export interface HeroImage {
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

export interface Video {
  id: string
  heroImage: HeroImage
  video: VideoStream
  videoPreview: VideoStream
  topics: Topic[]
  company: Company
  show: Show
  originalPublishedAt: string
  description: string
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

export interface Feed {
  title: string
  type?: 'objectFeed' | 'curatedFeed' | 'latestFeed'
  id?: string
  object?: FeedObject
  videos: VideoList
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
}

export interface Stripe {
  currentPeriodStart: Date
  currentPeriodEnd: Date
}

export interface Subscription {
  stripe: Stripe
  active: boolean
  _id: string
  type: 'monthly' | 'yearly'
  createdAt: Date
  id: string
}

export interface GetSubscriptionResponse {
  subscription: Subscription
}
