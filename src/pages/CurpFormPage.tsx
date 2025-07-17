import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import CustomButton from '../components/Button';
import ResultBox from '../components/ResultBox';
import { queryByCurp } from '../services/curpService';
import { useCurpQueryStore } from '../store/useCurpQueryStore';
import { useEffect, useState } from 'react';

const CurpFormPage = () => {
  const { control, handleSubmit } = useForm();
  const { setLoading, setError, setResult, error, result } = useCurpQueryStore();

  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const apiKey = params.get('APIKey');

  useEffect(() => {
    if (!apiKey) {
      setApiKeyMissing(true);
    }
  }, [apiKey]);

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

  if (apiKeyMissing) {
    return (
      <Typography color="error" mt={4}>
        Falta el parámetro APIKey en la URL. Este widget requiere una API Key válida para funcionar.
      </Typography>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        name="curp"
        label="CURP"
        control={control}
        rules={{ required: 'Este campo es obligatorio' }}
      />

      <CustomButton>Validar CURP</CustomButton>

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
