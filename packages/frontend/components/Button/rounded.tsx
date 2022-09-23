import { enterOrSpace } from '@/utils/accessibility'
import classNames from 'classnames'
import React from 'react'

type RoundButtonProps = {
  onClick?: () => void
  className?: string
}
const RoundButton: React.FC<RoundButtonProps> = ({
  children,
  onClick = () => null,
  className = '',
}) => (
  <div
    tabIndex={-1}
    onKeyDown={enterOrSpace(onClick)}
    onClick={onClick}
    role="button"
    className={classNames(
      'flex justify-center items-center w-13 h-13 bg-black hover:bg-neutral-100 focus:bg-neutral-100 rounded-full cursor-pointer transition-colors text-neutral-1000 focus:outline-none',
      className
    )}
  >
    {children}
  </div>
)

export default RoundButton
