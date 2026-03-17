export interface FormTextInputProps {
  label?: string;
  id?: string;
  className?: string;
  placeholder?: string;
  /** Validation error message shown below the input. */
  error?: string;
  type?: 'text' | 'email';
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
}

export interface FormSelectProps {
  label?: string;
  id?: string;
  className?: string;
  options: FormSelectOption[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface FormSelectOption {
  label: string;
  value: string;
}

export interface FormCheckboxProps {
  id?: string;
  label?: string | React.ReactNode;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}
