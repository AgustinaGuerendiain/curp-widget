import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import type { DropdownProps } from '../types/form';

const Dropdown = ({ name, label, rules, options }: DropdownProps) => {
  return (
    <Controller
      name={name}
      rules={rules}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <FormControl
          fullWidth
          margin="normal"
          error={!!error}
          style={{ marginTop: '4px' }}
          size="small"
        >
          <InputLabel>{label}</InputLabel>
          <Select
            {...field}
            label={label}
            value={field.value || ''}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderRadius: '8px',
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {/* {error && ( */}
          <FormHelperText>{error ? error.message : ' '}</FormHelperText>
          {/* )} */}
        </FormControl>
      )}
    />
  );
};

export default Dropdown;
