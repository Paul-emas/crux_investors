import CardHorizontal from '@/components/Listing/CardHorizontal'
import Card from '@components/Listing/Card'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import * as timeago from 'timeago.js'
import React from 'react'

import { typeListingMap } from './constants'
import { Feed, Guest, Report, Video } from './mappedTypings'
import { DColor } from './typings'

dayjs.extend(LocalizedFormat)

export const componentToHex = (c: number): string => {
  const hex = c.toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

export const rgbToHex = (color: DColor): string => {
  const red = parseInt(color?.r)
  const green = parseInt(color?.g)
  const blue = parseInt(color?.b)

  if (isNaN(red) || isNaN(green) || isNaN(blue)) {
    return '#171717'
  }

  return '#' + componentToHex(red) + componentToHex(green) + componentToHex(blue)
}

export const guest = (video: Video): Guest => {
  return video?.guests?.[0]
}

export const getFeedUrl = (feed: Feed): string => {
  if (feed?.object?.type && feed?.object?.id) {
    return `/${typeListingMap[feed?.object?.type] || feed?.object?.type}/${feed?.object?.id}`
  } else {
    return `/${typeListingMap[feed?.type] || feed?.type}/${feed?.id}`
  }
}

export const getPrettyTime = (seconds: number): string => {
  return `${
    seconds / 3600 >= 1
      ? `${Math.floor(seconds / 3600)
          .toString()
          .padStart(2, '0')}:`
      : ''
  }${Math.floor((seconds / 60) % 60)
    .toString()
    .padStart(2, '0')}:${Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')}`
}

export const genCards = (
  type?: string,
  videos?: readonly Video[],
  reports?: readonly Report[],
  show?: boolean
): JSX.Element[] => {
  const currentYear = dayjs().year()
  let carouselItems = []

  if (type === 'video') {
    carouselItems = videos.map((data, idx) => {
      let date = null
      data.publishedAt ? (date = timeago.format(data.publishedAt)) : null
      let author = data.companyName
      if (data.guests) {
        author = data.guests.map((g) => g.name).join(', ')
      }
      return (
        <Card
          author={author}
          date={date}
          key={`${idx}-${data.videoId}`}
          image={data.heroImageUrl}
          title={data.title}
          time={data?.video?.duration ? getPrettyTime(data.video.duration) : null}
          href={`/v/${data.videoId}`}
          showHref={show ? `/show/${data.showId}` : ''}
          showName={show ? data.showName : ''}
          fallbackColor={data?.heroColor}
        />
      )
    })
  }

  if (type === 'report') {
    carouselItems = reports.map((data, idx) => {
      let date = null
      data.createdAt ? (date = dayjs(data.createdAt)) : null

      let displayDate = ''
      if (date && data.createdAt) {
        displayDate = date.format(date.year() === currentYear ? 'MMM YYYY' : 'MMM YYYY')
      }
      return (
        <Card
          date={displayDate}
          key={`${idx}-${data.reportId}`}
          image={data.heroImageUrl}
          title={data.title}
          href={`/memos/${data?.reportId}`}
          fallbackColor={data?.heroColor}
          isMemo
        />
      )
    })
  }

  return carouselItems
}

export const genCardsHor = (type: 'video', videos: readonly Video[]): JSX.Element[] => {
  let carouselItems
  if (type === 'video') {
    carouselItems = videos.map((data, idx) => {
      const date = data.publishedAt ? timeago.format(data.publishedAt) : null
      return (
        <CardHorizontal
          author={guest(data)?.name || data.companyName}
          date={date}
          key={`${idx}-${data.videoId}`}
          image={data.heroImageUrl}
          title={data.title}
          time={data?.video?.duration ? getPrettyTime(data.video.duration) : null}
          href={`/v/${data.videoId}`}
          fallbackColor={data?.heroColor}
        />
      )
    })
  }
  return carouselItems
}
