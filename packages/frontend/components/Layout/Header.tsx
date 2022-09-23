import { GetUserResponse } from '@/utils/typings'
import Logo from '@components/Svgs/Logo'
import URLArrow from '@components/Svgs/URLArrow'
import { useUser } from '@crux/nextjs-auth0'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Menu from '../Svgs/Menu'
import Times from '../Svgs/Times'
import MobileNav from './MobileNav'
import SearchBox from './SearchBox'
import UserAvatar from './UserAvatar'

const Header: React.FC<unknown> = () => {
  const router = useRouter()
  const { user, isLoading } = useUser()
  const [userName, setUserName] = useState('')
  const [userIsLoading, setUserIsLoading] = useState(false)
  const [userIsPercent, setUserIsPercent] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(true)

  useEffect(() => {
    ;(async () => {
      setUserIsLoading(true)
      const rs = await fetch('/api/crux/user', {
        method: 'GET',
      })
      const data = (await rs.json()) as GetUserResponse
      ;(global as any)?.analytics?.identify(data._id, user)
      setUserName(data?.name || '')
      setUserIsPercent(data?.isPercentUser)
      setUserIsLoading(false)
    })()
  }, [setUserIsLoading, setUserName, setUserIsPercent, user])

  const paths = [
    { url: '/', name: 'Home', pathname: '/' },
    { url: '/bookmark/list', name: 'My List', pathname: '/bookmark/list' },
    { url: '/account', name: 'Account Settings', pathname: '/account', hidden: true },
    { url: '/edit/email', name: 'Change Email', pathname: '/edit/email', hidden: true },
    { url: '/edit/password', name: 'Change Password', pathname: '/edit/password', hidden: true },
    { url: '/subscription', name: 'Subscription', pathname: '/subscription', hidden: true },
    {
      url: '/subscription/methods',
      name: 'Add payment method',
      pathname: '/subscription/methods',
      hidden: true,
    },
    { url: '/help-center', name: 'Help Center', pathname: '/help-center', hidden: true },
    { url: '/v/[slug]', name: 'Video', pathname: '/v/[slug]', hidden: true },
    { url: '/memos/[slug]', name: 'Memos', pathname: '/memos/[slug]', hidden: true },
    {
      url: '/[...listing]',
      name: 'Listings',
      pathname: '/[...listing]',
      hidden: true,
    },
  ].map((p) => ({ ...p, active: p.url === router.pathname }))

  const showMenu = paths.map(({ pathname }) => pathname).includes(router.pathname)

  return (
    <>
      {router.asPath === '/edit/email' && openSnackbar && (
        <div className="w-full h-16 bg-colour-f1 flex items-center justify-between px-4 xxs:px-6 sm:px-9 lg:px-16">
          <span className="text-neutral-080 leading-4 w-10/12 xzs:w-10/12 xxs:w-10/12 xs:w-full text-xsm">
            If you change your email, you may have to create a new Percent profile.
          </span>
          <button onClick={() => setOpenSnackbar(false)}>
            <Times />
          </button>
        </div>
      )}
      <div
        role="navigation"
        className="h-18 px-2 xs:px-6 md:px-9 lg:px-14 flex lg:grid lg:grid-cols-nav items-center justify-between bg-neutral-080 w-full fixed z-50"
      >
        <div className="flex items-center h-full">
          <button
            onClick={() => setOpenMenu(true)}
            className="mr-4 w-12 h-12 rounded-full border-none outline-none focus:outline-none flex justify-center items-center md:hidden hover:bg-neutral-090 hover:shadow-gradient-hover active:shadow-gradient-pressed duration-200"
          >
            <Menu />
          </button>
          <span className="hidden xs:block">
            <Link href="/">
              <a>
                <span className="w-7 h-6 block md:hidden">
                  <Logo width="27.39px" height="24" />
                </span>
                <span className="w-9 h-8 hidden md:block">
                  <Logo width="36.53px" height="32px" />
                </span>
              </a>
            </Link>
          </span>
          {showMenu ? (
            <div className="hidden md:flex text-sm ml-11 h-full text-neutral-600">
              {paths
                .filter((p) => !p.hidden)
                .map((p) => (
                  <Link key={p.url} href={p.url}>
                    <a className="mt-px h-full text-neutral-900 mr-2 last:mr-0 flex items-center">
                      <div className="px-3 py-2.5 bg-neutral-080 hover:shadow-gradient-hover active:shadow-gradient-pressed text-xsm rounded-full duration-200">
                        {p?.name}
                      </div>
                    </a>
                  </Link>
                ))}
            </div>
          ) : null}
        </div>

        <MobileNav
          userName={userName ?? ''}
          userEmail={user?.email ?? ''}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        />

        {showMenu ? (
          <div className="flex items-center justify-end col-start-3 h-full">
            {showMenu ? <SearchBox /> : null}
            {userIsPercent ? (
              <div className="hidden md:flex text-sm ml-18 text-neutral-600 h-full">
                <a
                  href="https://percent.cruxinvestor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-px h-full mr-6.25 flex items-center border-b border-transparent"
                >
                  <span className="mr-1">Percent</span>
                  <URLArrow />
                </a>
              </div>
            ) : null}
            <UserAvatar
              userName={userName}
              userEmail={user?.email}
              userIsLoading={userIsLoading || isLoading}
            />
          </div>
        ) : null}
      </div>
    </>
  )
}

export default Header
