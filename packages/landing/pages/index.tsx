import Layout from '@components/Layout'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const Home: React.FC = observer(() => {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      home
    </Layout>
  )
})

export default Home
