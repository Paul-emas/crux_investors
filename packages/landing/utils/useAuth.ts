import { UserContext, useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useAuth = (): UserContext => {
  const { user, isLoading, error, checkSession } = useUser()
  const router = useRouter()
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/register')
    }
  }, [user, isLoading, router])
  return { user, isLoading, error, checkSession }
}
