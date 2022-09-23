import React from 'react'

type ModalProps = { title?: string; open?: boolean; setOpen: (value) => void }

const Modal: React.FC<ModalProps> = ({ title, open, setOpen, children }) => {
  return (
    <>
      <div
        className={`${
          open ? 'visible' : 'invisible'
        } fixed w-full flex justify-center items-end xs:items-center min-h-screen z-50 inset-0`}
      >
        <button
          onClick={() => setOpen(false)}
          className={`${
            open ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-300'
          } w-full h-full bg-black bg-opacity-60 absolute outline-none border-none`}
        ></button>
        <div
          className={`${
            !open
              ? 'translate-y-100 xs:translate-y-4 scale-95 xs:opacity-0 ease-out duration-200'
              : 'translate-y-0 scale-100 xs:opacity-100 ease-in duration-300'
          } bg-neutral-080 xs:bg-neutral-090 w-full xs:w-103 xs:p-6 pb-10 xs:pb-6 rounded-t-xl xs:rounded-xl transform`}
        >
          <h1 className="text-base h-15 xs:h-auto flex items-center justify-center xs:block border-b border-neutral-300 xs:border-none xs:text-2.5xl mb-4 text-neutral-1000 font-title">
            {title}
          </h1>
          <div className="p-4 xs:p-0">{children}</div>
          <div className="flex justify-center xs:hidden">
            <div className="rounded-full w-28 h-1 absolute bottom-2 bg-neutral-500"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
