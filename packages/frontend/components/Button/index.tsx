import classNames from 'classnames'
import React from 'react'
import ArrowUp from '../Svgs/ArrowUp'

type ButtonProps = {
  className?: string
  customPx?: boolean
  disabled?: boolean
  error?: boolean
  fill?: boolean
  gray?: boolean
  info?: boolean
  light?: boolean
  loading?: boolean
  noStyle?: boolean
  transition?: boolean
  onClick?: () => void
  primary?: boolean
  secondary?: boolean
  secondaryError?: boolean
  cancel?: boolean
  arrow?: boolean
  size?: 'small' | 'base' | 'large'
  radius?: 'small' | 'base' | 'large'
  type?: 'submit' | 'reset' | 'button'
  working?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  customPx = false,
  disabled = false,
  error = false,
  fill = false,
  gray = false,
  info = false,
  light = false,
  loading = false,
  noStyle = false,
  transition = true,
  onClick = () => null,
  primary = false,
  secondary,
  secondaryError = false,
  cancel,
  arrow = false,
  radius = 'base',
  size = 'base',
  type = 'button',
  working = false,
}) => {
  const isSimple =
    !primary && !secondary && !error && !light && !disabled && !info && !noStyle && !gray && !cancel
  return (
    <button
      type={type}
      className={classNames(
        'flex items-center justify-center border-none outline-none shadow-none focus:outline-none relative',
        {
          'duration-200 transition-all': transition,
          'h-9 text-xsm': size === 'small',
          'h-12 text-base': size === 'base',
          'h-14 text-md': size === 'large',
          'rounded-lg': radius === 'small',
          'rounded-xl': radius === 'base',
          'rounded-full': radius === 'large',
          'bg-colour-g2 text-neutral-000 hover:bg-colour-g3': primary,
          'bg-neutral-035 text-neutral-080 hover:shadow-gradient-white-hover active:shadow-gradient-white-pressed': gray,
          'bg-neutral-085 text-neutral-035 hover:shadow-gradient-hover active:shadow-gradient-pressed': secondary,
          'bg-neutral-085 text-colour-r1 hover:shadow-gradient-hover active:shadow-gradient-pressed': secondaryError,
          'bg-colour-r2 text-neutral-035 hover:shadow-gradient-hover-inset active:shadow-gradient-pressed-inset': cancel,
          'bg-neutral-090 text-neutral-095 font-medium': disabled || light,
          'hover:bg-neutral-075': light,
          'opacity-20 cursor-not-allowed': disabled,
          'bg-transparent text-colour-r2 border-colour-r2 hover:text-colour-r3 hover:border-colour-r3 border-1.5': error,
          'bg-neutral-035 text-neutral-050': isSimple,
          'w-full': fill,
          'px-16': !fill && !customPx,
          'bg-colour-b2 hover:bg-colour-b3 text-neutral-035': info,
          'opacity-30': working,
        },
        className
      )}
      disabled={disabled || working || loading}
      onClick={disabled || working || loading ? null : onClick}
    >
      {!loading ? (
        children
      ) : (
        <div className="">
          <div
            style={{ borderTopColor: 'transparent' }}
            className="animate-spin border border-neutral-700 border-solid h-4 rounded-full w-4"
          ></div>
        </div>
      )}
      {arrow && (
        <span className="float-right right-4 absolute">
          <ArrowUp />
        </span>
      )}
    </button>
  )
}

export default Button
