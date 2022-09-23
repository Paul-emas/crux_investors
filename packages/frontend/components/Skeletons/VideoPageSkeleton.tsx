import Head from 'next/head'
import React from 'react'

import Layout from '../Layout'
import RelatedListSkeleton from './RelatedListSkeleton'

const VideoPageSkeleton: React.FC<unknown> = () => {
  return (
    <Layout>
      <Head>
        <title>Loading</title>
      </Head>
      <div className="xxs:px-0 xs:px-8 sm:px-9 lg:px-14 4xl:px-0 xs:py-12 grid lg:grid-cols-3 gap-6 4xl:max-w-1400 mx-auto">
        <div className="col-span-2 4xl:max-w-1040">
          <div
            className="w-full bg-neutral-100 relative animate-pulse"
            style={{ paddingBottom: '56%' }}
          ></div>
        </div>
        <RelatedListSkeleton />
      </div>
    </Layout>
  )
}

export default VideoPageSkeleton
