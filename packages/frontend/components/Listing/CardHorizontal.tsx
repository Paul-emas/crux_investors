import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type CardHorizontalProps = {
  author: string
  date: string
  fallbackColor?: string
  href?: string
  image: string
  time?: string
  title: string
}

const CardHorizontal: React.FC<CardHorizontalProps> = ({
  author,
  date,
  href,
  image,
  time,
  title,
}) => {
  return (
    <Link href={href}>
      <a className="bg-neutral-080 flex flex-row overflow-hidden h-22.5 mb-4 transition-all">
        <div className="relative w-40 min-w-40 rounded-xl overflow-hidden border border-neutral-border bg-neutral-085 hover:shadow-gradient-hover active:shadow-gradient-pressed duration-200">
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
        <div className="flex flex-col pl-4 pb-3 pt-3 pr-3">
          <div className="text-neutral-800 text-sm line-clamp-2">{title}</div>
          <div className="hidden xl:flex items-center text-sm text-neutral-600 mt-2">
            <div className="line-clamp-1">{date}</div>
            {date && author ? (
              <div className="w-0.5 h-0.5 rounded-full bg-neutral-400 mx-2"></div>
            ) : null}
            <div className="line-clamp-1">{author}</div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default CardHorizontal
