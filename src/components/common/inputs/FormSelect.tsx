import type { FormSelectProps } from '#/types/common/form'
import { useId } from 'react'
import { useFormContext } from 'react-hook-form'
import { IconCaretDown } from '../icons/IconCaretDown'

export function FormSelect({
  label,
  id: idProp,
  className = '',
  options,
  placeholder,
  error,
  required = false,
  disabled = false,
}: FormSelectProps) {
  const { register } = useFormContext()
  
  const generatedId = useId()
  const inputId = idProp ?? generatedId

  return (
    <div className="flex flex-col gap-2">
      {label != null && (
        <label htmlFor={inputId} className="text-base font-medium text-on-background-dimmed">
          {label}
          {required && <span aria-hidden>*</span>}
        </label>
      )}
      <div className={`input-group relative flex rounded-lg border bg-transparent text-sm text-on-background focus-within:outline-none focus-within:ring-1 focus-within:ring-primary ${error ? 'border-destructive' : 'border-input-border'} ${className}`}>
        <select
          {...register(inputId)}
          id={inputId}
          aria-required={required}
          aria-invalid={error != null}
          aria-describedby={error ? `${inputId}-error` : undefined}
          disabled={disabled}
          className="w-full outline-none! ps-6 py-4 appearance-none pe-[calc(1.5rem+16px)] text-on-background-dimmed [&:has(option:not([value='']):checked)]:text-on-background"
          defaultValue=""
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      
        <div className="ms-4 pointer-events-none text-on-background-dimmed me-4 py-4 absolute right-0 top-0 bottom-0 flex items-center justify-center">
          <IconCaretDown className="w-[24px] h-[24px]" />
        </div>
      </div>
      
      {error != null && (
        <p id={`${inputId}-error`} className="text-sm font-medium text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
