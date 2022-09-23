import React, { useEffect } from 'react'

import CheckCircle from '../Svgs/CheckCircle'
import TimesCircle from '../Svgs/TimesCircle'

type AlertProps = { icon?: boolean; error?: boolean; open?: boolean; setOpen: (value) => void }

const Alert: React.FC<AlertProps> = ({ icon, error, open, setOpen, children }) => {
  useEffect(() => {
    if (open)
      setTimeout(() => {
        setOpen(false)
      }, 5000)
  }, [open, setOpen])

  return (
    <div className={`${open ? 'visible' : 'invisible'} px-2 xs:px-0 h-40 fixed inset-0 z-999`}>
      <button
        onClick={() => setOpen(false)}
        className={`${
          open ? 'translate-y-0 opacity-100 duration-200' : '-translate-y-10 opacity-0 duration-300'
        } transform bg-neutral-035 min-h-14 max-h-20 mt-2 xs:mt-20 py-3 mx-auto relative outline-none shadow-alert focus:outline-none
       w-full xs:w-80 rounded-2xl flex items-center px-6`}
      >
        {icon && <span className="mr-6">{error ? <TimesCircle /> : <CheckCircle />}</span>}
        <span className="capitalize text-neutral-080 text-base text-left">{children}</span>
      </button>
    </div>
  )
}

export default Alert
