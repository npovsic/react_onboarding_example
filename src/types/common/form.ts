export interface FormTextInputProps {
  label?: string
  id?: string
  className?: string
  placeholder?: string
  /** Validation error message shown below the input */
  error?: string
  /** Input type (e.g. "password" for password fields) */
  type?: 'text' | 'password' | 'email'
  /** Whether the field is required */
  required?: boolean
}