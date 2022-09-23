import { useEffect } from 'react'

export const useToc = (): any => {
  useEffect(() => {
    const onScroll = (): void => {
      try {
        const reportContainer = document.querySelector('.articleContent')
        const headers = reportContainer.querySelectorAll('[name*="_"]')
        const currentElement = [...headers.values()]
          .reverse()
          .find((e) => e.getBoundingClientRect().top - 80 < 0) as HTMLAnchorElement

        const tocContainer = document.querySelector('.tocContainer')

        tocContainer.querySelectorAll(`[href^="#"]`).forEach((e) => {
          e.classList.remove('text-neutral-600')
          e.classList.remove('text-neutral-800')
          e.classList.add('text-neutral-400')
          e.previousElementSibling.classList.remove('bg-neutral-600')
          e.previousElementSibling.classList.add('bg-transparent')
        })

        if (currentElement) {
          const anchorLink = tocContainer.querySelector(`[href="#${currentElement.name}"]`)
          anchorLink.classList.remove('text-neutral-400')
          anchorLink.classList.add('text-neutral-600')
          anchorLink.previousElementSibling.classList.add('bg-neutral-600')
          anchorLink.previousElementSibling.classList.remove('bg-transparent')

          const parentSection = anchorLink?.parentElement?.parentElement?.previousElementSibling
          if (parentSection?.classList?.contains('tocElement')) {
            const parentLink = parentSection.querySelector('a')
            parentLink.classList.remove('text-neutral-400')
            parentLink.classList.add('text-neutral-800')
          }
        }
      } catch (e) {
        console.error('Failed to follow scroll for ToC', e)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    // document.querySelector('[href="#_Making money baby!"]')
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
}
