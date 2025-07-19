import { Controller } from 'react-hook-form';
import { DateField as MuiDateField } from '@mui/x-date-pickers/DateField';
import type { InputDateProps } from '../types/form';



const InputDate = ({ name, label, control, rules }: InputDateProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={null}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <MuiDateField
          label={label}
          value={value}
          onChange={onChange}
          format="dd/MM/yyyy"
          fullWidth
          margin="normal"
          slotProps={{
            textField: {
              error: !!error,
              helperText: error?.message,
            },
          }}
          sx={{
            '& .MuiPickersOutlinedInput-root': {
              borderRadius: '8px',
            },
            marginTop: '8px',
          }}
        />
      )}
    />
  );
};

export default InputDate;
