import { Alert } from '@mui/material';
import { queryByCurp } from '../services/curpService';
import { useTranslation } from 'react-i18next';
import { FormWrapper, Input } from '../components';
import { useApiKeyStore, useCurpQueryStore } from '../store';
import { useFormHook } from '../hooks';

const CurpFormPage = () => {
  const { t } = useTranslation();

  const { setLoading, setError, setResult, error, loading } =
    useCurpQueryStore();

  const apiKey = useApiKeyStore((state) => state.apiKey);

  const { handleSuccess, handleError } = useFormHook({
    setResult,
    setError,
  });

  const onSubmit = async (data: any) => {
    if (!apiKey) return;

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const response = await queryByCurp(data.curp, apiKey);

      if (response.errors) {
        handleError(t('error.no_curp'));
      } else {
        handleSuccess(response);
      }
    } catch (err) {
      handleError(t('error.error_curp'));
    } finally {
      setLoading(false);
    }
  };

  if (!apiKey) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {t('missing_api_key')}
      </Alert>
    );
  }

  return (
    <FormWrapper onSubmit={onSubmit} loading={loading} error={error}>
      <Input
        name="curp"
        label={t('curp_label')}
        rules={{ required: t('curp_required') }}
      />
    </FormWrapper>
  );
};

export default CurpFormPage;
