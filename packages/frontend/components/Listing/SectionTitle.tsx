import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

export type SectionTitleProps = {
  name: string
  caption?: string
  href: string
  className?: string
  viewMore?: boolean
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  name,
  caption,
  href,
  className = '',
  viewMore = true,
}) => {
  return (
    <div
      className={classNames(
        'flex items-center justify-between px-3 xs:px-7 lg:px-12 z-10',
        className
      )}
    >
      <div className="mr-4">
        <div className="text-lg tracking-tight font-title text-neutral-1000">{name}</div>
        <div className="text-sb mb-2 text-neutral-055 leading-5">{caption}</div>
      </div>
      {viewMore && (
        <Link href={href}>
          <a className="text-sm  text-neutral-1000 tracking-tight mr-2.5">
            <div className="px-3 py-2.5 bg-neutral-080 hover:shadow-gradient-hover active:shadow-gradient-pressed text-xsm rounded-full duration-200">
              See all
            </div>
          </a>
        </Link>
      )}
    </div>
  )
}

export default SectionTitle
