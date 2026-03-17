import type { FormCheckboxProps } from "#/types/common/form";
import { useId } from "react";
import { useFormContext } from "react-hook-form";

export function FormCheckbox({ id: idProp, label, error, required }: FormCheckboxProps) {
    const { register } = useFormContext()
  
  const generatedId = useId()
  const inputId = idProp ?? generatedId
  
  return (
    <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
            <input {...register(inputId)} type="checkbox" id={inputId} className="w-4 h-4 accent-primary" />
            <label htmlFor={inputId} className="text-base font-medium text-on-background-dimmed">{label}</label>
        </div>
    {error != null && (
        <p id={`${inputId}-error`} className="text-sm font-medium text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}