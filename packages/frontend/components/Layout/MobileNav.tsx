import React from 'react'
import Link from 'next/link'
import Percentage from '../Svgs/Percentage'
import Subscription from '../Svgs/Subscription'
import User from '../Svgs/User'
import ArrowUp from '../Svgs/ArrowUp'
import Logout from '../Svgs/Logout'

type MobileNav = {
  userName: string
  userEmail: string
  openMenu: boolean
  setOpenMenu: (v) => void
}

const MobileNav: React.FC<MobileNav> = ({ userName, userEmail, openMenu, setOpenMenu }) => {
  const routes = [
    { name: 'Percent', Icon: Percentage, url: '/' },
    { name: 'Account', Icon: User, url: '/account' },
    { name: 'Subscription', Icon: Subscription, url: '/subscription' },
    { name: 'Log out', Icon: Logout, url: '/api/auth/logout' },
  ]

  return (
    <div
      role="navigation"
      className={`${
        openMenu ? 'visible' : 'invisible'
      } block md:hidden fixed ease inset-0 w-full min-h-screen z-999`}
    >
      <button
        onClick={() => setOpenMenu(false)}
        className="w-full h-full bg-black bg-opacity-60 outline-none shadow-none border-none"
      ></button>
      <div
        className={`${
          openMenu ? 'left-0' : '-left-full'
        } w-64 xzs:w-75 xxs:w-83 xs:w-89 h-full ease duration-200 bg-neutral-100 overflow-hidden z-10 absolute top-0`}
      >
        <div className="mt-14 ml-4 xs:mt-3 pb-3 border-b border-neutral-300 text-neutral-035">
          <span>{userName}</span>
          <p className="text-sm text-neutral-055">{userEmail}</p>
        </div>
        <Link href="/">
          <a>
            <div className="py-3.5 pl-4 h-18 hover:bg-neutral-090 hover:shadow-gradient-hover active:shadow-gradient-pressed duration-200">
              <span className="text-netutral-035 text-4xl">Home</span>
            </div>
          </a>
        </Link>
        <Link href="/bookmark/list">
          <a>
            <div className="py-3.5 pl-4 h-18 hover:bg-neutral-090 hover:shadow-gradient-hover active:shadow-gradient-pressed duration-200">
              <span className="text-netutral-035 text-4xl">My List</span>
            </div>
          </a>
        </Link>
        {routes.map(({ name, Icon, url }, index) => (
          <Link key={index} href={url}>
            <a className="group">
              <div className="w-full pl-5 flex items-center h-16 hover:bg-neutral-090 hover:shadow-gradient-hover active:shadow-gradient-pressed duration-200">
                <Icon />
                <div
                  className={`${
                    index !== routes.length - 1 &&
                    'border-b border-neutral-300 group-hover:border-transparent'
                  } pb-6 mt-5 leading-5 relative left-5 w-full`}
                >
                  <span className="relative top-0.5">{name}</span>
                </div>
                {index === 0 && (
                  <span className="absolute right-6 float-right">
                    <ArrowUp />
                  </span>
                )}
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MobileNav
