import React from 'react'

const Logo: React.FC<unknown> = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#EEEEEE" />
      <circle cx="12" cy="12" r="5" fill="#070707" />
      <path d="M12 12H24" stroke="#070707" strokeWidth="2.5" />
      <path d="M12 19V24" stroke="#070707" strokeWidth="5" />
    </svg>
  )
}

export default Logo
