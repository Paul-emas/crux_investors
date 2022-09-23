/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useUser } from '@crux/nextjs-auth0'
import { enterOrSpace } from '@utils/accessibility'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import Chevron from '../Svgs/Chevron'
import Percentage from '../Svgs/Percentage'
import Subscription from '../Svgs/Subscription'
import User from '../Svgs/User'
import ArrowUp from '../Svgs/ArrowUp'
import Logout from '../Svgs/Logout'

type UserAvatarProps = {
  userName: string
  userEmail: string
  userIsLoading: boolean
}

const UserAvatar: React.FC<UserAvatarProps> = ({ userEmail, userIsLoading, userName }) => {
  const router = useRouter()
  const { user } = useUser()
  const [showMenu, setShowMenu] = useState(false)

  const goToUserPage = useCallback(() => {
    router.push('/account')
  }, [router])

  const initials = (
    `${userName?.split(' ')?.[0]?.[0] || ''}${userName?.split(' ')?.[1]?.[0] || ''}`.trim() || ''
  ).toUpperCase()

  const avatar = <span className="text-black text-sm">{initials}</span>

  return (
    <div className="hidden md:flex items-end relative">
      <div
        className={classNames(
          'w-9 h-9 rounded-full flex items-center justify-center relative bg-colour-g2 hover:bg-colour-g3 mr-1',
          {
            'bg-neutral-500 animate-pulse': userIsLoading,
          }
        )}
      >
        <div
          role="button"
          tabIndex={-1}
          onKeyDown={enterOrSpace(goToUserPage)}
          className="cursor-pointer flex items-center justify-center focus:outline-none"
          onClick={goToUserPage}
        >
          {!userIsLoading && userName ? avatar : null}
        </div>
      </div>
      <div onClick={() => setShowMenu(!showMenu)}>
        <div className="relative">
          <button className="w-9 h-9 rounded-full outline-none border-none focus:outline-none focus:border-none hover:shadow-gradient-hover active:shadow-gradient-pressed duration-200">
            <div className={`mt-0.5 w-6 h-6 mx-auto flex items-center justify-center`}>
              {showMenu ? (
                <span className="relative -top-0.5">
                  <Chevron dir="up" />
                </span>
              ) : (
                <Chevron dir="down" />
              )}
            </div>
          </button>
        </div>
        <div
          className={classNames(
            'absolute bg-neutral-090 right-0 rounded-lg shadow-dropdown text-sm top-14 transition-opacity w-64',
            {
              'opacity-0 pointer-events-none': !showMenu,
              'opacity-100': showMenu,
            }
          )}
        >
          <div className="-top-9 absolute bg-transparent h-11 w-54.75"></div>
          <div className="pl-4.5">
            <div className="py-4 border-b border-neutral-300">
              <div className="truncate text-base text-neutral-035">{userName}</div>
              <div className="text-sm tracking-tight truncate text-neutral-055">
                {user?.email || userEmail}
              </div>
            </div>
          </div>
          <div className="overflow-hidden">
            <Link href="/account">
              <a className="group">
                <div className="w-full pl-6 h-16 flex items-center hover:bg-neutral-090 hover:shadow-gradient-hover active:shadow-gradient-pressed duration-200">
                  <Percentage />
                  <div className="pb-6 mt-5 leading-5 border-b border-neutral-300 group-hover:border-transparent relative left-5 w-full text-base duration-75">
                    <span className="relative top-1.5">Percent</span>
                  </div>
                  <span className="absolute right-6 float-right">
                    <ArrowUp />
                  </span>
                </div>
              </a>
            </Link>
            <Link href="/account">
              <a className="group">
                <div className="w-full pl-6 flex h-16 items-center hover:bg-neutral-090 hover:shadow-gradient-hover active:shadow-gradient-pressed duration-200">
                  <User />
                  <div className="pb-6 mt-5 leading-5 border-b border-neutral-300 group-hover:border-transparent relative left-5 w-full text-base duration-75">
                    <span className="relative top-1">Account</span>
                  </div>
                </div>
              </a>
            </Link>
            <Link href="/subscription">
              <a className="group">
                <div className="w-full pl-6 flex h-16 items-center hover:bg-neutral-090 hover:shadow-gradient-hover active:shadow-gradient-pressed duration-200">
                  <Subscription />
                  <div className="pb-6 mt-5 leading-5 border-b  border-neutral-300 group-hover:border-transparent relative left-5 w-full text-base duration-75">
                    <span className="relative top-1">Subscription</span>
                  </div>
                </div>
              </a>
            </Link>
            <Link href="/api/auth/logout">
              <a
                onClick={() => {
                  ;(global as any)?.analytics?.track('Log out')
                }}
                className="group"
              >
                <div className="w-full pl-6 overflow-x-hidden rounded-b-md flex items-center hover:bg-neutral-090 hover:shadow-gradient-hover active:shadow-gradient-pressed duration-200">
                  <Logout />
                  <div className="pb-6 mt-5 leading-5 border-b  border-neutral-300 group-hover:border-transparent relative left-5 w-full text-base duration-75">
                    <span className="relative top-1">Logout</span>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserAvatar
