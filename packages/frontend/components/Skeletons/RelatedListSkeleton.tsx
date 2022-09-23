import React from 'react'

const RelatedListSkeleton: React.FC<unknown> = () => {
  return (
    <div className="px-4 xs:px-0">
      <div className="animate-pulse bg-neutral-100 rounded-xl flex flex-row overflow-hidden h-22.5 mb-4 transition-all hover:shadow-hover"></div>
      <div className="animate-pulse bg-neutral-100 rounded-xl flex flex-row overflow-hidden h-22.5 mb-4 transition-all hover:shadow-hover"></div>
      <div className="animate-pulse bg-neutral-100 rounded-xl flex flex-row overflow-hidden h-22.5 mb-4 transition-all hover:shadow-hover"></div>
      <div className="animate-pulse bg-neutral-100 rounded-xl flex flex-row overflow-hidden h-22.5 mb-4 transition-all hover:shadow-hover"></div>
      <div className="animate-pulse bg-neutral-100 rounded-xl flex flex-row overflow-hidden h-22.5 mb-4 transition-all hover:shadow-hover"></div>
      <div className="animate-pulse bg-neutral-100 rounded-xl flex flex-row overflow-hidden h-22.5 mb-4 transition-all hover:shadow-hover"></div>
      <div className="animate-pulse bg-neutral-100 rounded-xl flex flex-row overflow-hidden h-22.5 mb-4 transition-all hover:shadow-hover"></div>
      <div className="animate-pulse bg-neutral-100 rounded-xl flex flex-row overflow-hidden h-22.5 mb-4 transition-all hover:shadow-hover"></div>
    </div>
  )
}

export default RelatedListSkeleton
