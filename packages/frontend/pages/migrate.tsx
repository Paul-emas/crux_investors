import Button from '@/components/Button'
import Chevron from '@/components/Svgs/Chevron'
import Layout from '@components/Layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'

const MigratePage: React.FC<unknown> = () => {
  const router = useRouter()
  const openLogin = useCallback(() => {
    router.push('/api/auth/login?ui_locales=migrate')
  }, [router])
  return (
    <Layout>
      <Head>
        <title>Migrate</title>
      </Head>
      <div className="flex flex-col items-center max-w-110.4 mx-auto pt-15">
        <div className="text-title mb-8">The start of a new beginning.</div>
        <div className="text-lg tracking-tight text-neutral-500 leading-6 mb-8">
          {`Thank you for taking part in the beta.`}
          <div className="h-6" />
          {`The requests, surveys and calls many members have been answering will be integral in the future of Crux Investor.`}
          <div className="h-6" />
          {`As a thank you, all beta testers will be getting a special private forum called Percent. All your posts from Mighty Networks will be transfered. You will get an email soon with all the details about the private forum.`}
          <div className="h-6" />
          {`We'd also like to thank you for your understanding and patience so far.`}
          <div className="h-6" />
          {`Now, this is the first time we launch our house-built service in the wild. There may be hiccups, but we're always ready to help.`}
          <div className="h-6" />
          {`We'll continue to work on taking the complexity out of investing so everyone can make money; this is the first major step on that journey.`}
          <div className="h-6" />
          {`See you inside!`}
        </div>
        <Button onClick={openLogin} className="w-full px-3" primary>
          Enter
          <span className="pl-4">
            <Chevron />
          </span>
        </Button>
      </div>
    </Layout>
  )
}

export default MigratePage
