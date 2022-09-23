import React, { useEffect, useState } from 'react'
import { useUser } from '@crux/nextjs-auth0'
import Link from 'next/link'
import Chevron from '../Svgs/Chevron'

const ProfileCard: React.FC = () => {
  const { user, isLoading } = useUser()
  const [email, setEmail] = useState<string>('')

  useEffect(() => {
    if (!isLoading && user?.email) {
      setEmail(user.email)
    }
  }, [user.email, isLoading])

  return (
    <div className="w-full bg-neutral-080 xs:bg-neutral-090 xs:rounded-xl overflow-hidden">
      <Link href="/edit/email">
        <a className="h-19 flex hover:shadow-gradient-hover active:shadow-gradient-pressed duration-200 group">
          <div className="cursor-pointer border-b border-neutral-300 group-hover:border-transparent flex items-center w-full ml-4">
            <div className="flex justify-between items-center w-full">
              <div>
                <div className="text-sm text-neutral-055 font-normal">Email</div>
                <div className="text-base text-neutral-035 font-light">{email}</div>
              </div>
              <span className="mr-6">
                <Chevron dir="right" />
              </span>
            </div>
          </div>
        </a>
      </Link>
      <Link href="/edit/password">
        <a className="h-19 cursor-pointer flex items-center hover:shadow-gradient-hover active:shadow-gradient-pressed duration-200 pl-4">
          <div className="flex justify-between items-center w-full">
            <div>
              <div className="text-sm text-neutral-055 font-normal">Password</div>
              <div className="text-3.5xl tracking-tighter -mt-3.5 font-medium">........</div>
            </div>
            <span className="mr-6">
              <Chevron dir="right" />
            </span>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default ProfileCard
