import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HeaderWhite: React.FC<unknown> = () => {
  return (
    <div className="h-18 px-14 grid grid-cols-nav items-center border-b bg-white w-full fixed z-50">
      <div className="flex items-center h-full">
        <Link href="/">
          <a className="flex">
            <Image src="/logo-crux.png" width="78px" height="24px" />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default HeaderWhite
