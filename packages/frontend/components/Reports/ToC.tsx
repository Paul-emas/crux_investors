import { IGNORE_ASCII } from '@/utils/regex'
import React, { useEffect, useState } from 'react'

type ToCProps = {
  content: HTMLDivElement
  html: string
}

const ToC: React.FC<ToCProps> = ({ content, html }) => {
  const [tocDivRef, setTocDivRef] = useState<HTMLDivElement>(null)

  useEffect(() => {
    if (html && content && tocDivRef) {
      content.innerHTML = html
      let toc = ''
      let level = 0
      let elementIdx = 0

      const newHtml = html.replace(
        /<h([\d])>([^<]+)<\/h([\d])>/gi,
        (str, openLevel, titleText, closeLevel) => {
          ++elementIdx
          if (openLevel != closeLevel) {
            return str + ' - ' + openLevel
          }

          if (openLevel > level) {
            toc += new Array(openLevel - level + 1).join('<ol class="pl-5.5">')
          } else if (openLevel < level) {
            toc += new Array(level - openLevel + 1).join('</ol>')
          }

          level = parseInt(openLevel)

          const anchor = `_${titleText.replace(IGNORE_ASCII, '_')}`

          return (
            '<h' +
            openLevel +
            '><a class="pt-20 -mt-20 inline-block" name="' +
            anchor +
            '-' +
            elementIdx +
            '">' +
            titleText +
            '</a></h' +
            closeLevel +
            '>'
          )
        }
      )
      content.innerHTML = newHtml

      tocDivRef.innerHTML = toc
    }
  }, [html, content, tocDivRef])

  return (
    <div
      ref={(ref) => setTocDivRef(ref)}
      className="tocContainer -ml-5.5 sticky top-18 pt-24 flex justify-center text-sm text-neutral-400"
    ></div>
  )
}

export default ToC
