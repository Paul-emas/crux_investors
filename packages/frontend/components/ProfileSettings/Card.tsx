import React from 'react'

const Card: React.FC<{ title?: string }> = ({ children, title = null }) => (
  <div className="bg-neutral-050 px-2 xxs:px-4 xs:px-10 py-8 rounded-xl mb-4 flex-1">
    {title && (
      <div className="font-semibold tracking-tight text-xl text-neutral-800 mb-8">{title}</div>
    )}
    {children}
  </div>
)

export default Card
