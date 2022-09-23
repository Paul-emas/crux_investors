import Button from '@/components/Button'
import Layout from '@components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const HelpCenterPage: React.FC<unknown> = () => {
  return (
    <Layout>
      <Head>
        <title>Help Center</title>
      </Head>
      <div className="flex flex-col items-center pt-18">
        <Link href="/v/test">
          <a>Video</a>
        </Link>
        <Link href="/signup">
          <a>Register</a>
        </Link>
        <Link href="/auth/signin">
          <a>Sign In</a>
        </Link>
        <Link href="/migrate">
          <a>Migrate</a>
        </Link>
        <Link href="/password">
          <a>Forgot password</a>
        </Link>
        <Link href="/password/confirm">
          <a>Forgot password: Confirm</a>
        </Link>
        <Link href="/user/reset_password">
          <a>Forgot password: Reset</a>
        </Link>
        <Link href="/api/auth/logout">
          <a>Logout</a>
        </Link>
      </div>
      <div className="flex items-center justify-between mt-8 mx-9">
        <Button>Simple</Button>
        <Button primary>Primary</Button>
        <Button secondary>Secondary</Button>
        <Button light>Light</Button>
        <Button info>Info</Button>
        <Button error>Error</Button>
      </div>
      <div className="flex items-center justify-between mt-1 border-t border-neutral-050 pt-1 mx-9">
        <Button working>Simple</Button>
        <Button working primary>
          Primary
        </Button>
        <Button working secondary>
          Secondary
        </Button>
        <Button working light>
          Light
        </Button>
        <Button working info>
          Info
        </Button>
        <Button working error>
          Error
        </Button>
      </div>
    </Layout>
  )
}

export default HelpCenterPage
