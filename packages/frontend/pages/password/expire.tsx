import Button from '@components/Button'
import Layout from '@components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const FPExpiredPage: React.FC<unknown> = () => {
  return (
    <Layout className="px-4 w-full xs:w-103 max-w-103 mx-auto">
      <Head>
        <title>Link expired</title>
      </Head>
      <div className="pt-6">
        <h1 className="text-neutral-035 text-3.5xl  whitespace-pre">Link expired</h1>
        <p className="text-neutral-055 pt-6 text-base">
          Sorry, this password reset link has expired. You’ll need to request a new one.
        </p>
        <div className="w-full mt-8">
          <Link href="/password">
            <Button type="submit" secondary size="large" arrow className="w-full">
              Forgot Password
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default FPExpiredPage
