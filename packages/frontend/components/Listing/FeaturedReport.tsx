import { enterOrSpace } from '@/utils/accessibility'
import Button from '@components/Button'
import ReadIcon from '@components/Svgs/Read'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'

type FeaturedReportProps = {
  fallbackColor?: string
  href: string
  image?: string
  subtitle: string
  title: string
}

const FeaturedReport: React.FC<FeaturedReportProps> = ({
  fallbackColor = '#171717',
  href,
  image,
  subtitle,
  title,
}) => {
  const router = useRouter()

  const open = useCallback(() => {
    router.push(href)
  }, [router, href])

  return (
    <div
      onClick={open}
      onKeyDown={enterOrSpace(() => open())}
      role="button"
      tabIndex={-1}
      className="cursor-pointer focus:outline-none"
    >
      <div className="w-full h-72 xxs:h-96 md:h-110.5 mb-10 md:mb-0 relative mt-2 lg:mt-7">
        <div
          className="absolute inset-px rounded-xl"
          style={{ backgroundColor: fallbackColor || '#171717' }}
        ></div>
        {image ? (
          <Image
            alt={`Memo: ${title}`}
            src={image || '/1px.png'}
            layout="fill"
            loading="eager"
            className="object-cover rounded-xl"
          />
        ) : null}
        <div className="absolute flex inset-0 items-center">
          <div className="ml-8 md:ml-14 flex flex-col h-full justify-between py-14">
            <div className="flex flex-col">
              <div className="tracking-tight text-white mb-4">{subtitle}</div>
              <div className="font-title text-3xl md:text-hero md:whitespace-pre text-white">
                {title}
              </div>
            </div>
            <div className="mt-4">
              <Link href={href}>
                <a>
                  <Button className="w-auto">
                    <span className="pr-4">
                      <ReadIcon />
                    </span>
                    Read
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedReport
