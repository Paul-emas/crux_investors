import classNames from 'classnames'
import React from 'react'

type FeaturedSectionProps = {
  header?: string
  description?: string
  className?: string
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  header = 'Latest memo',
  description,
  children,
  className = '',
}) => {
  return (
    <div className={classNames('px-5 xs:px-7 sm:px-8 lg:px-14 md:py-9 flex flex-col', className)}>
      <div className="flex flex-col">
        <div className="text-lg md:mb-3 md:text-header font-title tracking-tight text-neutral-1000">
          {header}
        </div>
        <div className="tracking-tight text-neutral-600 pt-2">{description}</div>
      </div>
      {children}
    </div>
  )
}

export default FeaturedSection
