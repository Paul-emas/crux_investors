import Layout from '@components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const ErrorPage: React.FC<unknown> = () => {
  const router = useRouter()
  const reusedAuthLink = router.query?.source === 'login_callback'

  useEffect(() => {
    ;(global as any)?.analytics?.track('Error Page', router?.query)
  }, [router?.query])

  return (
    <Layout>
      <Head>
        <title>Oops</title>
      </Head>
      <div className="text-center text-title pt-4">Error</div>
      {reusedAuthLink ? (
        <div className="text-center pt-4">
          Authentication failed,{' '}
          <Link href="/api/auth/login">
            <a className="underline text-colour-g2">please retry to login</a>
          </Link>
        </div>
      ) : null}
    </Layout>
  )
}

export default ErrorPage
