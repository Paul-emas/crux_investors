import Layout from '@components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const NotFoundPage: React.FC<unknown> = () => {
  return (
    <Layout>
      <Head>
        <title>404: not found</title>
      </Head>
      <div className="text-center pt-4">
        <div className="">
          Page not found.{' '}
          <Link href="/">
            <a className="underline">Go to home</a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage
