import { KeyboardEventHandler } from 'react'

export const enterOrSpace = <T>(cb?: any): KeyboardEventHandler<T> => (e) => {
  if (['Enter', ' '].includes(e?.key)) {
    e.preventDefault()
    cb?.()
  }
}
