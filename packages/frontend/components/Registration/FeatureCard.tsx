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
      className={classNames(
        'cursor-pointer w-5 h-5 bg-neutral-050 rounded-full border border-solid flex',
        {
          'border-neutral-400': !checked,
          'border-colour-g2': checked,
        }
      )}
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
  features: string[]
  name: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
  price: string
  subtitle?: string
  tabIndex: number
}
const FeatureCard: React.FC<FeatureCardProps> = ({
  checked,
  features,
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
      'bg-neutral-100 p-1.5 rounded-lg group cursor-pointer border outline-none',
      {
        'border-colour-g2': checked,
        'border-transparent focus:border-neutral-400': !checked,
      }
    )}
  >
    <div className="pl-2.5 pt-1.5 pb-3">
      <FeatureRadio checked={checked} />
    </div>
    <div className="pl-2.5 text-neutral-800 text-xl pb-1.5">{name}</div>
    <div className="pl-2.5 n600 pb-6 text-sm text-neutral-600">{price}</div>
    <div className="pl-2.5 pr-0.5 text-neutral-900 text-xs pb-3">
      {features.map((feature, idx) => (
        <div key={idx}>
          <span className="text-colour-g2 mr-2">✓</span>
          {feature}
        </div>
      ))}
    </div>
    {subtitle ? (
      <div className="pl-2.5 whitespace-pre pb-7 text-xs text-neutral-500">{subtitle}</div>
    ) : null}
  </div>
)

export default FeatureCard
