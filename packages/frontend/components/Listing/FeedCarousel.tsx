import { genCards } from '@/utils/gen'
import { Report, Video } from '@/utils/mappedTypings'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'

import Carousel from './Carousel'
import Section from './Section'
import SectionTitle from './SectionTitle'

type CarouselProps = {
  type?: string
  className?: string
  href?: string
  overlap?: boolean
  persistHover?: boolean
  plain?: boolean
  title: string
  caption?: string
  videos?: readonly Video[]
  reports?: readonly Report[]
}

const FeedCarousel: React.FC<CarouselProps> = ({
  className = '',
  type = 'video',
  href = '#',
  overlap = false,
  persistHover = false,
  plain = false,
  title,
  caption,
  videos,
  reports,
}) => {
  const [state, setState] = useState({ videos: [] })
  const [stateReport, setStateReport] = useState({ reports: [] })
  let carousel = null

  useEffect(() => {
    if (type === 'video' && videos) {
      setState({ videos: [...videos] })
    } else if (type === 'report' && reports) {
      setStateReport({ reports: [...reports] })
    } else {
      return
    }

    return () => {
      setState({ videos: [] })
      setStateReport({ reports: [] })
    }
  }, [type, setState, setStateReport, videos, reports])

  if ((videos && videos.length) || (reports && reports.length)) {
    if (plain) {
      carousel = (
        <div
          className={classNames(className, 'flex flex-col z-10', {
            'mt-6 -mb-12 md:mt-12': overlap,
          })}
        >
          <Section className="z-50" name={title} href={href}>
            {genCards(type, state.videos)}
          </Section>
        </div>
      )
    } else {
      carousel = (
        <div
          className={classNames(className, 'flex flex-col z-10', {
            'mt-6 -mb-12 md:mt-12': overlap,
          })}
        >
          <SectionTitle
            className="ml-2"
            caption={caption}
            name={title}
            href={href}
            viewMore={type === 'video' ? true : false}
          />
          <Carousel
            persistHover={persistHover}
            items={
              type === 'video'
                ? genCards(type, state.videos)
                : genCards(type, state.videos, stateReport.reports)
            }
            type={type}
          />
        </div>
      )
    }
  }

  return carousel
}

export default FeedCarousel
