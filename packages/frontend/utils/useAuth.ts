import { UserContext, useUser } from '@crux/nextjs-auth0'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useAuth = (): UserContext => {
  const { user, isLoading, error, checkSession } = useUser()
  const router = useRouter()
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/api/auth/logout')
    }
  }, [user, isLoading, router])
  return { user, isLoading, error, checkSession }
}
