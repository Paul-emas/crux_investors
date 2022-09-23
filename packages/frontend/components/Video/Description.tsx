import React, { useEffect, useRef, useState } from 'react'

type DescriptionProps = {
  body?: string
}

const Description: React.FC<DescriptionProps> = ({ body = '' }) => {
  const [shortDescription, setShortDescription] = useState(true)
  const [innerText, setInnerText] = useState(' ')
  const descriptionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    requestAnimationFrame(() => {
      if (descriptionRef.current) {
        if (descriptionRef.current.getBoundingClientRect().height / 24 >= 3.8) {
          setShortDescription(true)
        } else {
          setShortDescription(false)
        }
      }
    })
  }, [body])

  useEffect(() => {
    setInnerText(
      (body || '')
        ?.replace(/[\r\n]+/gm, '')
        ?.replace(/\s+/g, ' ')
        ?.replaceAll?.('<p', ' <p')
        ?.replaceAll?.('<a', ' <a')
    )
  }, [setInnerText, body])

  return (
    <>
      <div
        ref={descriptionRef}
        className="text-neutral-035 mt-6 mb-3.5 w-full xl:w-2/3 tracking-tight videoDescription max-w-full"
        dangerouslySetInnerHTML={{
          __html: (shortDescription ? innerText : body) || 'No description',
        }}
      ></div>
    </>
  )
}

export default Description
