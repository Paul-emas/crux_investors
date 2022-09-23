import { enterOrSpace } from '@/utils/accessibility'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'

type CardProps = {
  author?: string
  date: string
  fallbackColor?: string
  href?: string
  image: string
  showHref?: string
  showName?: string
  time?: string
  isMemo?: boolean
  title: string
}

const Card: React.FC<CardProps> = ({
  author,
  date,
  href,
  image,
  showHref,
  showName,
  time,
  title,
  isMemo = false,
}) => {
  const router = useRouter()
  const onShowClick = useCallback(
    (e: MouseEvent) => {
      e?.preventDefault?.()
      router.push(showHref)
    },
    [router, showHref]
  )
  return (
    <Link href={href}>
      <a className="rounded-xl flex flex-col overflow-hidden transition-all">
        <div
          className={`${
            isMemo ? 'pb-15/16' : 'pb-9/16'
          } relative border border-neutral-border rounded-xl bg-neutral-085 hover:shadow-gradient-hover active:shadow-gradient-pressed duration-200 overflow-hidden`}
        >
          <div className="w-full h-full absolute hover:shadow-gradient-hover active:shadow-gradient-pressed z-20 duration-200"></div>
          <Image
            alt={`Video: ${title}`}
            src={image || '/1px.png'}
            onDragStart={(e) => e.preventDefault()}
            layout="fill"
            className="object-cover"
          />
          {time ? (
            <div className="backdrop-filter backdrop-blur-lg absolute bg-neutral-080 hover:shadow-gradient-hover active:shadow-gradient-pressed text-xsm text-neutral-035 rounded-3xl right-2 bottom-2">
              <p className="py-1 px-2">{time}</p>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col md:py-4 pt-3 h-23.5">
          <div className="text-neutral-035 text-sb 4xl:text-base line-clamp-2">{title}</div>
          <div className="flex items-center text-xsm md:text-sm text-neutral-055 pt-0.5">
            <div className="line-clamp-1">{date}</div>
            {date && author && !isMemo ? (
              <div className="w-0.5 h-0.5 rounded-full bg-neutral-078 mx-2"></div>
            ) : null}
            {!isMemo && <div className="line-clamp-1">{author}</div>}
          </div>
        </div>
        {showHref ? (
          <div
            tabIndex={-1}
            role="link"
            onClick={onShowClick as any}
            onKeyDown={enterOrSpace(onShowClick)}
            className="relative border-t border-neutral-100 mx-1 focus:outline-none"
          >
            <div className="text-colour-g2 text-sm px-3 line-clamp-1 py-3">{showName}</div>
          </div>
        ) : null}
      </a>
    </Link>
  )
}

export default Card
