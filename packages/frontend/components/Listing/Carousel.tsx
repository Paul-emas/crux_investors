// import BigChevron from '@components/Svgs/BigChevron'
// import { enterOrSpace } from '@utils/accessibility'
// import classNames from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'
import AliceCarousel, { EventObject } from 'react-alice-carousel'

type CarouselProps = {
  items: JSX.Element[]
  type: string
  persistHover?: boolean
  onResize?: (count: number) => void
}

const responsive = {
  0: {
    items: 1,
  },
  599: {
    items: 2,
  },
  1023: {
    items: 3,
  },
  1279: {
    items: 4,
  },
  1329: {
    items: 4,
  },
  1535: {
    items: 5,
  },
}

const memoResponsive = {
  0: {
    items: 1,
  },
  599: {
    items: 2,
  },
  719: {
    items: 3,
  },
  1023: {
    items: 4,
  },
  1279: {
    items: 5,
  },
  1535: {
    items: 6,
  },
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  type = 'video',
  // persistHover = false,
  onResize = () => null,
}) => {
  const [totalSlides, setTotalSlides] = useState<number[]>([])
  // const [itemsInSlide, setItemsInSlide] = useState<number>(0)
  const [neededItems, setNeededItems] = useState<number>(0)
  // const [currentSlide, setCurrentSlide] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliderRef, setSliderRef] = useState<AliceCarousel | null>(null)

  let fillerItems = []

  if (items.length && neededItems - items.length > 0) {
    fillerItems = new Array(neededItems - items.length)
      .fill(null)
      .map((_, idx) => <div key={idx} />)
  }

  useEffect(() => {
    onResize(totalSlides.length)
  }, [totalSlides.length, onResize])

  //Todo: Add prev and next buttons that matches design
  // const slide = React.useCallback(
  //   (i: number) => {
  //     sliderRef?.slideTo?.(itemsInSlide * i)
  //   },
  //   [sliderRef, itemsInSlide]
  // )
  // const prev = React.useCallback(() => {
  //   if (currentSlide === 0) {
  //     slide(totalSlides.length - 1)
  //   } else {
  //     slide(currentSlide - 1)
  //   }
  // }, [slide, totalSlides, currentSlide])

  // const next = React.useCallback(() => {
  //   if (currentSlide >= totalSlides.length - 1) {
  //     slide(0)
  //   } else {
  //     slide(currentSlide + 1)
  //   }
  // }, [slide, totalSlides, currentSlide])

  const paddedItems = [...items, ...fillerItems].map((item) => (
    <div key={item.key} className="p-3">
      {item}
    </div>
  ))

  const hideControls = totalSlides.length <= 1 || items.length === 0

  const onSlideChanged = useCallback(
    (e: EventObject) => {
      requestAnimationFrame(() => {
        const breakItems =
          Object.entries(responsive)
            .reverse()
            .find(([w]) => parseInt(w) < window.innerWidth)?.[1]?.items || 1

        setNeededItems(breakItems)
        setCurrentIndex(e.item)
        // Todo: Activate this line when working on carousel navigation
        // setCurrentSlide(e.slide)
        // setItemsInSlide(itemsPerSlide)
        const itemsPerSlide = sliderRef?.state?.itemsInSlide || e.itemsInSlide
        setTotalSlides(
          new Array(Math.ceil(Math.min(4, items.length / itemsPerSlide)) || 0)
            .fill(0)
            .map((_, idx) => idx)
        )
      })
    },
    [
      items,
      setTotalSlides,
      // setCurrentSlide,
      // setItemsInSlide,
      setCurrentIndex,
      setNeededItems,
      sliderRef,
    ]
  )

  return (
    <div className="group flex relative w-full items-center">
      <div className="flex-1 w-0 relative px-2 xs:px-6 lg:px-11">
        <div className="">
          <AliceCarousel
            activeIndex={currentIndex}
            infinite
            onInitialized={onSlideChanged}
            onResized={onSlideChanged}
            onSlideChanged={onSlideChanged}
            disableDotsControls
            disableButtonsControls
            ref={(ref) => {
              setSliderRef(ref)
            }}
            responsive={type === 'video' ? responsive : memoResponsive}
            mouseTracking={!hideControls}
            items={paddedItems}
          />
        </div>
      </div>
    </div>
  )
}

export default Carousel
