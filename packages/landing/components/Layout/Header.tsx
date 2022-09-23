import Logo from '@components/Svgs/Logo'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Header: React.FC<unknown> = () => {
  const router = useRouter()

  const paths = [{ url: '/', name: 'Home', pathname: '/', hidden: false }].map((p) => ({
    ...p,
    active: p.url === router.pathname,
  }))

  const showMenu = paths.map(({ pathname }) => pathname).includes(router.pathname)

  return (
    <div className="h-18 px-14 flex items-center border-b bg-white w-full border-neutral-200 fixed z-50">
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      {showMenu ? (
        <div className="hidden md:flex text-sm font-title ml-18 h-full text-neutral-100">
          {paths
            .filter((p) => !p.hidden)
            .map((p) => (
              <Link key={p.url} href={p.url}>
                <a
                  className={classNames('mt-px h-full mr-6.25 flex items-center border-b', {
                    'border-transparent': !p.active,
                    'text-neutral-900 border-colour-brand': p.active,
                  })}
                >
                  {p?.name}
                </a>
              </Link>
            ))}
        </div>
      ) : null}
    </div>
  )
}

export default Header
