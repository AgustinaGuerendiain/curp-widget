import type { Control, FieldValues, RegisterOptions } from 'react-hook-form';

export interface FormFieldProps {
  name: string;
  label: string;
  control: Control<FieldValues>;
  rules?: RegisterOptions;
  type?: string;
  placeholder?: string;
}

export interface Option {
  label: string;
  value: string;
}

export interface DropdownProps {
  name: string;
  label: string;
  control: Control<FieldValues>;
  rules?: RegisterOptions;
  options: Option[];
}

export interface DatePickerFieldProps {
  name: string;
  label: string;
  control: Control<FieldValues>;
  rules?: RegisterOptions;
}

export interface CustomButtonProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export interface InputDateProps {
  name: string;
  label: string;
  control: Control<FieldValues>;
  rules?: RegisterOptions;
}
