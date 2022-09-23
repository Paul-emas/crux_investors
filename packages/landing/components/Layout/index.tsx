import classNames from 'classnames'
import React from 'react'
import Header from './Header'

type LayoutProps = {
  className?: string
}

const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="w-full h-full">
      <Header />
      <div className={classNames('py-18', className)}>{children}</div>
    </div>
  )
}

export default Layout
