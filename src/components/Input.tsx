import type { FormFieldProps } from '../types/form';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

const Input = ({
  name,
  label,
  control,
  rules,
  type = 'text',
  placeholder,
}: FormFieldProps) => {
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
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
            marginTop: '8px',
          }}
        />
      )}
    />
  );
};

export default Input;
