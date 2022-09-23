import classnames from 'classnames'
import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import InputMask from 'react-input-mask'
import AddCreditCard from '../Svgs/AddCreditCard'

type InputProps = {
  cardDisabled?: boolean
  cardPlaceholder?: string
  cardRegister?: UseFormRegisterReturn
  className?: string
  cvcDisabled?: boolean
  cvcRegister?: UseFormRegisterReturn
  error?: string
  expDisabled?: boolean
  expPlaceholder?: string
  expRegister?: UseFormRegisterReturn
  inputClassName?: string
  label: string
  labelAppend?: JSX.Element
  labelClassName?: string
  type?: string
}

const CreditCardInput: React.FC<InputProps> = ({
  cardDisabled = false,
  cardPlaceholder = '0000 0000 0000 0000',
  cardRegister = null,
  className = '',
  cvcDisabled = false,
  cvcRegister = null,
  error = '',
  expDisabled = false,
  expPlaceholder = '',
  expRegister = null,
  label,
  labelAppend,
  labelClassName = '',
  type = 'text',
}) => {
  return (
    <div
      className={classnames(className, {
        'px-3 mt-5.5': !className,
      })}
    >
      <label className="flex flex-col">
        <span
          className={classnames(
            'pb-2 text-sm tracking-tight text-neutral-1000 flex justify-between',
            labelClassName
          )}
        >
          {label}
          {labelAppend}
        </span>
        <div className="flex items-center pl-4 rounded-xl bg-neutral-085 overflow-hidden focus-within:shadow-input-normal-focus">
          <AddCreditCard />
          <InputMask
            {...cardRegister}
            mask="9999 9999 9999 9999"
            maskChar=""
            placeholder={cardPlaceholder}
            disabled={cardDisabled}
            type={type}
            className={classnames(
              'placeholder-neutral-500 h-12 tracking-tight w-full text-sm rounded-xl rounded-r-none bg-neutral-085 pl-4 outline-none'
            )}
          />
        </div>
        {error ? <div className="text-colour-r2 text-sm pt-2 tracking-tight">{error}</div> : null}
      </label>
      <div className="grid grid-cols-2 space-x-4 mt-4">
        <div>
          <span
            className={classnames(
              'pb-2 text-sm tracking-tight text-neutral-1000 flex justify-between',
              labelClassName
            )}
          >
            Expiry date
          </span>
          <div className="rounded-xl bg-neutral-085 overflow-hidden focus-within:shadow-input-normal-focus">
            <InputMask
              {...expRegister}
              mask="99 / 99"
              maskChar=""
              placeholder={expPlaceholder || 'MM / YY'}
              type={type}
              disabled={expDisabled}
              className={classnames(
                'placeholder-neutral-500 flex-1 h-12 pl-4 tracking-tight text-sm bg-neutral-085 outline-none'
              )}
            />
          </div>
        </div>
        <div>
          <span
            className={classnames(
              'pb-2 text-sm tracking-tight text-neutral-1000 flex justify-between',
              labelClassName
            )}
          >
            Security code
          </span>
          <div className="rounded-xl bg-neutral-085 overflow-hidden focus-within:shadow-input-normal-focus">
            <InputMask
              {...cvcRegister}
              mask="999"
              maskChar=""
              placeholder="123"
              type={type}
              disabled={cvcDisabled}
              className={classnames(
                'placeholder-neutral-500 flex-1 h-12 pl-4 tracking-tight text-sm rounded-xl rounded-l-none bg-neutral-085 outline-none'
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

CreditCardInput.displayName = 'CreditCardInput'

export default CreditCardInput
