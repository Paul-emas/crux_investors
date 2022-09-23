import classNames from 'classnames'
import React from 'react'

import HeaderWhite from './HeaderWhite'

type WhiteLayoutProps = {
  className?: string
}

const WhiteLayout: React.FC<WhiteLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="w-full h-full bg-white absolute">
      <HeaderWhite />
      <div className={classNames('py-18', className)}>{children}</div>
    </div>
  )
}

export default WhiteLayout
