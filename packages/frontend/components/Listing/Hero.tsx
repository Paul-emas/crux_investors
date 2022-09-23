import classNames from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

type HeroProps = {
  header: string
  href?: string
  image: string
  report?: boolean
}

const Hero: React.FC<HeroProps> = ({ header, href = '/', image, report = false }) => {
  const router = useRouter()
  useEffect(() => {
    if (href) {
      router.prefetch(href)
    }
  }, [router, href])
  return (
    <div className="xs:px-9 box-border relative lg:px-14 mt-12">
      <div
        className={classNames(
          'relative overflow-hidden bg-neutral-085 hover:shadow-gradient-hover active:shadow-gradient-pressed duration-200',
          {
            'h-45 xzs:h-54.75 sm:h-72 lg:h-73 xl:h-88 2xl:h-96 3xl:h-100 4xl:h-150 hidden xs:block w-full rounded-xl border border-neutral-border mb-12': !report,
            'h-45 xzs:h-54.75 sm:h-72 lg:h-73 2xl:h-75 w-full md:w-160 mx-auto xs:rounded-xl mb-4': report,
          }
        )}
      >
        <Image
          alt={header}
          loading="eager"
          src={image || '/1px.png'}
          layout="fill"
          className="object-cover object-center xs:rounded-xl z-0"
        />
        <div className="w-full h-full absolute bg-gradient-hero-enabled hover:bg-gradient-hero-hover active:bg-gradient-hero-pressed z-10"></div>
        <button
          onClick={() => router.push(href)}
          className="w-full h-full bg-gradient-hero-enabled hover:bg-gradient-hero-hover focus:border-none focus:outline-none absolute z-20 duration-200"
        ></button>
        <div
          className={`${report ? 'bottom-6' : 'bottom-10'} absolute w-full flex items-center z-30`}
        >
          <div className="mx-10 w-full">
            {!report && (
              <div className="font-title text-3.5xl line-clamp-1 h-10 font-medium text-white md:text-3xl">
                {header}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
