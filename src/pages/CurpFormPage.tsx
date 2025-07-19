import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import CustomButton from '../components/Button';
import ResultBox from '../components/ResultBox';
import { queryByCurp } from '../services/curpService';
import { useCurpQueryStore } from '../store/useCurpQueryStore';
import { useApiKeyStore } from '../store/useApiKeyStore';
import { useTranslation } from 'react-i18next';

const CurpFormPage = () => {
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm();
  const { setLoading, setError, setResult, error, result } =
    useCurpQueryStore();

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

      {result && <ResultBox data={result.personal_data} />}
    </Box>
  );
};

export default CurpFormPage;
