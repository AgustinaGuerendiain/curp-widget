import { Box, Alert } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import CustomButton from './Button';
import { useTranslation } from 'react-i18next';

type FormWrapperProps = {
  children: React.ReactNode;
  onSubmit: (data: any) => void;
  loading: boolean;
  error: string | null;
};

const FormWrapper = ({
  children,
  onSubmit,
  loading,
  error,
}: FormWrapperProps) => {
  const methods = useForm({ mode: 'all' });

  const { t } = useTranslation();

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        {children}

        <CustomButton loading={loading}>{t('validate_button')}</CustomButton>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
    </FormProvider>
  );
};

export default FormWrapper;
