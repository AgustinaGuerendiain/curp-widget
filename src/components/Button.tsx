import { Button } from '@mui/material'
import type { CustomButtonProps } from '../types/form'

const CustomButton = ({ children, fullWidth = true }: CustomButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      fullWidth={fullWidth}
      sx={{ mt: 2 }}
    >
      {children}
    </Button>
  )
}

export default CustomButton