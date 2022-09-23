import Button from '@components/Button'
import Layout from '@components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const FPConfirmPage: React.FC<unknown> = () => {
  return (
    <Layout className="px-4 w-full xs:w-103 max-w-103 mx-auto">
      <Head>
        <title>Thank you!</title>
      </Head>
      <div className="pt-6">
        <h1 className="text-neutral-035 text-3.5xl  whitespace-pre">Thank you!</h1>
        <p className="text-neutral-055 pt-6 text-base">
          Please check your email. Tap the button in the email to reset your password.
        </p>
        <div className="w-full mt-8">
          <Link href="/login">
            <Button type="submit" secondary size="large" arrow className="w-full">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default FPConfirmPage
