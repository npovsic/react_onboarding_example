import type { FormTextInputProps } from '#/types/common/form'
import { useId, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export function FormPasswordInput({
  label,
  id: idProp,
  className = '',
  placeholder = '',
  error,
  required = false,
}: FormTextInputProps) {
  const { register } = useFormContext()
  
  const generatedId = useId()
  const inputId = idProp ?? generatedId
  
  const [type, setType] = useState<'password' | 'text'>('password')
  
  const toggleType = () => {
    setType(type === 'password' ? 'text' : 'password')
  }

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
        className={`rounded-lg border bg-transparent px-6 py-4 text-sm text-on-background placeholder:text-on-background-dimmed focus:outline-none focus:ring-1 focus:ring-primary ${error ? 'border-destructive' : 'border-input-border'} ${className}`}
      />
      <button type="button" onClick={toggleType}>
        {type === 'password' ? 'Show' : 'Hide'}
      </button>
      {error != null && (
        <p id={`${inputId}-error`} className="text-sm font-medium text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
