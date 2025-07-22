import { Button } from '@mui/material';
import type { CustomButtonProps } from '../types/form';

const CustomButton = (props: CustomButtonProps) => {
  const { children, fullWidth = true, ...rest } = props;

  return (
    <Button
      {...rest}
      variant="contained"
      color="primary"
      type="submit"
      fullWidth={fullWidth}
      size="medium"
      style={{
        borderRadius: '8px',
        fontWeight: 'bold',
        letterSpacing: '0.5px',
        fontSize: '14px',
        textTransform: 'none',
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
