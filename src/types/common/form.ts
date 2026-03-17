export interface FormTextInputProps {
  label?: string
  id?: string
  className?: string
  placeholder?: string
  /** Validation error message shown below the input. */
  error?: string
  type?: 'text' | 'email'
  required?: boolean,
  autoFocus?: boolean,
  disabled?: boolean,
}