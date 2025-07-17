import type { FormFieldProps } from '../types/form';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

const Input = ({ name, label, control, rules, type = 'text', placeholder }: FormFieldProps)  => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          type={type}
          placeholder={placeholder}
          error={!!error}
          helperText={error?.message}
          variant="outlined"
          margin="normal"
        />
      )}
    />
  );
}

export default Input
