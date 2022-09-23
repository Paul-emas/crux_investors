import '../styles/globals.css'

import { StoreProvider } from '@components/StoreProvider'
import { AppPropsType } from 'next/dist/next-server/lib/utils'
import React from 'react'

const App: React.FC<AppPropsType> = ({ Component, pageProps }) => {
  return (
    <StoreProvider {...pageProps}>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default App
