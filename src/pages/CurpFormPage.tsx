import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import CustomButton from '../components/Button';
import { queryByCurp } from '../services/curpService';
import { useCurpQueryStore } from '../store/useCurpQueryStore';
import { useApiKeyStore } from '../store/useApiKeyStore';
import { useTranslation } from 'react-i18next';
import { PATHS } from '../navigation/paths';

const CurpFormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm();
  const { setLoading, setError, setResult, error } = useCurpQueryStore();
  const apiKey = useApiKeyStore((state) => state.apiKey);

  const onSubmit = async (data: any) => {
    if (!apiKey) return;

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const response = await queryByCurp(data.curp, apiKey);

      if (response.errors) {
        setError('CURP no encontrado o inválido.');
      } else {
        setResult(response.data);
        navigate(PATHS.RESULTS);
      }
    } catch (err) {
      setError('Hubo un error al consultar el CURP');
    } finally {
      setLoading(false);
    }
  };

  if (!apiKey) {
    return (
      <Typography color="error" mt={4}>
        {t('missing_api_key')}
      </Typography>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        name="curp"
        label={t('curp_label')}
        control={control}
        rules={{ required: t('curp_required') }}
      />

      <CustomButton>{t('validate_button')}</CustomButton>

      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default CurpFormPage;
