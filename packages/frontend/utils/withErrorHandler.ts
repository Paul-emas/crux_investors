import Cookies from 'cookies'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export const withErrorHandler = (handler: GetServerSideProps) => async (
  context: GetServerSidePropsContext<any>
): Promise<GetServerSidePropsResult<any>> => {
  try {
    return await handler(context)
  } catch (error) {
    if (error.message === 'no_subscription') {
      const cookies = new Cookies(context.req, context.res)
      cookies.set('canceled', 'true')
      return { redirect: { statusCode: 302, destination: '/signup?cf=1' } }
    } else if (error.code === 'access_token_expired') {
      return { redirect: { statusCode: 302, destination: '/api/auth/login' } }
    } else {
      return {
        redirect: {
          statusCode: 302,
          destination: `/error?e=${encodeURIComponent(error?.message || '')}&source=${
            encodeURIComponent(context.resolvedUrl) || ''
          }`,
        },
      }
    }
  }
}
