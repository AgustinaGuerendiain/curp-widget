import type { FormFieldProps } from '../types/form';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

const Input = ({
  name,
  label,
  rules,
  type = 'text',
  placeholder,
}: FormFieldProps) => {
  return (
    <Controller
      name={name}
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
          helperText={error ? error.message : ' '}
          variant="outlined"
          margin="normal"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
            marginTop: '4px',
          }}
        />
      )}
    />
  );
};

export default Input;
