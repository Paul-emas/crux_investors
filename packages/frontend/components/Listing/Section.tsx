import React from 'react'

import SectionTitle, { SectionTitleProps } from './SectionTitle'

type SectionProps = { className?: string }

const Section: React.FC<SectionProps & SectionTitleProps> = ({
  className,
  children,
  href,
  name,
}) => {
  return (
    <div className={className || 'mt-15'}>
      <SectionTitle name={name} href={href} />
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 px-9 lg:px-12 pt-5">{children}</div>
    </div>
  )
}

export default Section
