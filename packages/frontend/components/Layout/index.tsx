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
      <div
        role="main"
        id="mainLayout"
        className={classNames('py-12 bg-neutral-080 4xl:w-200 mx-auto', className)}
      >
        {children}
      </div>
    </div>
  )
}

export default Layout
