import Button from '@/components/Button'
import WhiteLayout from '@/components/Layout/White'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'

const ApplyPage: React.FC<unknown> = () => {
  const router = useRouter()
  const openLogin = useCallback(() => {
    router.push('/api/auth/login')
  }, [router])
  const apply = useCallback(() => {
    window.location.href = `mailto:percent@cruxinvestor.com?subject=Application to Percent [No Ref.]`
  }, [])
  return (
    <WhiteLayout>
      <Head>
        <title>Apply</title>
      </Head>
      <div className="flex flex-col items-center max-w-138 mx-auto pt-15">
        <div className="text-title font-title mb-8 text-neutral-050">Crux Investor Percent</div>
        <div className="tracking-tight text-neutral-200 leading-6 mb-8 text-center">
          Percent is a private community area capped at 1000 members. It’s run by, and only for,
          Crux Investor Plus members. The purpose is simple: to bring intelligent, like-minded
          people together to exchange ideas and make new friends. Percent typically operates on
          refferals, but you are more than welcome to apply if you think you’d be a good fit.
        </div>
        <div className="flex">
          <Button onClick={openLogin} gray className="mr-4">
            Go Back
          </Button>
          <Button onClick={apply} info>
            Apply Now
          </Button>
        </div>
      </div>
    </WhiteLayout>
  )
}

export default ApplyPage
