import React from 'react'

type SpeakerProps = {
  noCross?: boolean
}

const Speaker: React.FC<SpeakerProps> = ({ noCross }) => {
  return (
    <svg
      width="21"
      height="18"
      viewBox={'0 0 21 18'}
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
      {noCross ? (
        <>
          <path
            opacity="0.5"
            d="M13.4493 6.79531C13.9621 6.89981 14.4224 7.17979 14.751 7.58707C15.0797 7.99435 15.2561 8.50345 15.2498 9.02675C15.2436 9.55005 15.0552 10.0548 14.7169 10.4542C14.3787 10.8535 13.9119 11.1225 13.3967 11.2147"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            opacity="0.8"
            d="M14.0921 3.86484C15.2746 4.11632 16.334 4.76817 17.0915 5.71031C17.849 6.65245 18.2582 7.82714 18.2499 9.03602C18.2416 10.2449 17.8163 11.4139 17.046 12.3455C16.2756 13.2772 15.2073 13.9144 14.0215 14.1497"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </>
      ) : (
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
