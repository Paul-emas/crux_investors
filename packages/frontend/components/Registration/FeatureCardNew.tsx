import LogoFull from '@components/Svgs/LogoFull'
import { enterOrSpace } from '@utils/accessibility'
import classNames from 'classnames'
import React from 'react'

type FeatureRadioProps = {
  checked?: boolean
}
const FeatureRadio: React.FC<FeatureRadioProps> = ({ checked }) => {
  return (
    <div
      role="button"
      className={classNames('cursor-pointer w-4.25 h-4.25 rounded-full border border-solid flex', {
        'border-neutral-500': !checked,
        'border-colour-g2': checked,
      })}
    >
      <div
        className={classNames('flex-1 m-0.5 rounded-full', {
          'bg-colour-g2': checked,
        })}
      ></div>
    </div>
  )
}

type FeatureCardProps = {
  checked?: boolean
  name: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
  price: string
  subtitle?: string
  tabIndex: number
}
const FeatureCard: React.FC<FeatureCardProps> = ({
  checked,
  name,
  onClick,
  price,
  subtitle,
  tabIndex,
}) => (
  <div
    role="button"
    tabIndex={tabIndex}
    onClick={onClick}
    onKeyDown={enterOrSpace(() => onClick(null))}
    className={classNames(
      'antialiased bg-neutral-100 border cursor-pointer group outline-none px-2.75 py-4.25 relative rounded-lg',
      {
        'border-colour-g2': checked,
        'border-transparent focus:border-neutral-400': !checked,
      }
    )}
  >
    <div className="absolute right-2.5 top-2.5">
      <FeatureRadio checked={checked} />
    </div>
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <LogoFull />
        <span className="text-feature-title text-neutral-1000 ml-1.25 font-title">{name}</span>
      </div>
    </div>
    {subtitle ? (
      <div className="pt-3 whitespace-pre text-xsm text-neutral-800">{subtitle}</div>
    ) : null}
    <div className="pt-3 text-xsm font-normal text-neutral-600 font-title">{price}</div>
  </div>
)

export default FeatureCard
