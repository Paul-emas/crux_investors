import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export const withErrorHandler = (handler: GetServerSideProps) => async (
  context: GetServerSidePropsContext<any>
): Promise<GetServerSidePropsResult<any>> => {
  try {
    return await handler(context)
  } catch (error) {
    if (error.code === 'access_token_expired') {
      return { redirect: { statusCode: 302, destination: '/api/auth/login' } }
    } else {
      return { redirect: { statusCode: 302, destination: '/error' } }
    }
  }
}
