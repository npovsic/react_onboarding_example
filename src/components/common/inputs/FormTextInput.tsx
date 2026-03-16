import type { FormTextInputProps } from '#/types/common/form'
import { useId } from 'react'
import { useFormContext } from 'react-hook-form'

export function FormTextInput({
  label,
  id: idProp,
  className = '',
  placeholder = '',
  error,
  type = 'text',
  required = false,
}: FormTextInputProps) {
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
      <input
        {...register(inputId)}
        id={inputId}
        type={type}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={error != null}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`rounded border bg-transparent px-6 py-4 text-sm text-on-background placeholder:text-on-background-dimmed focus:outline-none focus:ring-1 focus:ring-primary ${error ? 'border-destructive' : 'border-input-border'} ${className}`}
      />
      {error != null && (
        <p id={`${inputId}-error`} className="text-sm font-medium text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
