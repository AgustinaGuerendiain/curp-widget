import type { ButtonProps } from '@mui/material';
import type { RegisterOptions } from 'react-hook-form';

export interface FormFieldProps {
  name: string;
  label: string;
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
  rules?: RegisterOptions;
  options: Option[];
}

export interface DatePickerFieldProps {
  name: string;
  label: string;
  rules?: RegisterOptions;
}

export interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export interface InputDateProps {
  name: string;
  label: string;
  rules?: RegisterOptions;
}
