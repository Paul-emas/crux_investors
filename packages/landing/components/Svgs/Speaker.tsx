import React from 'react'

type SpeakerProps = {
  noCross?: boolean
}

const Speaker: React.FC<SpeakerProps> = ({ noCross }) => {
  return (
    <svg
      width="23"
      height="18"
      viewBox={noCross ? '0 0 15 18' : '0 0 23 18'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 8C0 6.89543 0.895431 6 2 6H4V12H2C0.895431 12 0 11.1046 0 10V8Z"
        fill="currentColor"
      />
      <path
        d="M4 6L8.8 2.4C10.1185 1.41115 12 2.35191 12 4V14C12 15.6481 10.1185 16.5889 8.8 15.6L4 12V6Z"
        fill="currentColor"
      />
      {noCross ? null : (
        <>
          <rect
            x="13.8721"
            y="6.64279"
            width="1.33333"
            height="8"
            rx="0.666667"
            transform="rotate(-45 13.8721 6.64279)"
            fill="currentColor"
          />
          <rect
            x="13.8721"
            y="11.3568"
            width="8"
            height="1.33333"
            rx="0.666667"
            transform="rotate(-45 13.8721 11.3568)"
            fill="currentColor"
          />
        </>
      )}
    </svg>
  )
}

export default Speaker
