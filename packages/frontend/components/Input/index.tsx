import classnames from 'classnames'
import React, { ChangeEventHandler } from 'react'

type InputProps = {
  autoComplete?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  error?: string
  inputClassName?: string
  label: string
  labelAppend?: JSX.Element
  labelClassName?: string
  name: string
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  onChange?: ChangeEventHandler<HTMLInputElement>
  type?: string
  valid?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      autoComplete = '',
      placeholder = '',
      className = '',
      disabled = false,
      error = '',
      inputClassName = '',
      label,
      labelAppend,
      labelClassName = '',
      name,
      onBlur = null,
      onChange = () => null,
      type = 'text',
      valid,
    },
    ref
  ) => {
    return (
      <div
        className={classnames(className, {
          'px-3 mt-5.5': !className,
        })}
      >
        <label className="flex flex-col">
          <span
            className={classnames(
              'pb-2 text-sb tracking-tight flex justify-between',
              labelClassName
            )}
          >
            {label}
            {labelAppend}
          </span>
          <input
            autoComplete={autoComplete}
            ref={ref}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            disabled={disabled}
            className={classnames(
              'h-12 tracking-tight placeholder-neutral-078 text-base rounded-xl px-4 focus:outline-none focus:border-2 focus:border-neutral-035',
              inputClassName,
              {
                'max-w-xsm': !inputClassName,
                'bg-neutral-085': !disabled,
                'bg-neutral-090 border-neutral-090 text-neutral-095': disabled,
                'border-2 border-neutral-085 focus:shadow-input': !error && !valid,
                'border-2 bg-colour-r5 border-colour-r0 focus:border-colour-r0': error,
                'border-2 border-colour-g2': valid,
              }
            )}
          />
        </label>
        {error ? <div className="text-colour-r2 text-xsm pt-2 tracking-tight">{error}</div> : null}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
