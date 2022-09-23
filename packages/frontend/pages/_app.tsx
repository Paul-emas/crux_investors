import '../styles/fonts.css'
import '../styles/globals.css'

import { StoreProvider } from '@components/StoreProvider'
import { UserProvider } from '@crux/nextjs-auth0'
import { AppPropsType } from 'next/dist/next-server/lib/utils'
import Head from 'next/head'
import React from 'react'

const App: React.FC<AppPropsType> = ({ Component, pageProps }) => {
  const { user } = pageProps

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, maximum-scale=5, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <StoreProvider {...pageProps}>
        <UserProvider user={user}>
          <Component {...pageProps} />
        </UserProvider>
      </StoreProvider>
    </>
  )
}

export default App
