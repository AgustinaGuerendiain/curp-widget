import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';

import CustomButton from '../components/Button';
import ResultBox from '../components/ResultBox';
import { queryByPersonalData } from '../services/curpService';
import { usePersonalQueryStore } from '../store/usePersonalQueryStore';
import InputDate from '../components/InputDate';
import { MEXICAN_STATES } from '../const';
import { useApiKey } from '../hooks/useApiKey';


const genderOptions = [
  { label: 'Masculino', value: 'H' },
  { label: 'Femenino', value: 'M' },
];

const PersonalFormPage = () => {
  const { control, handleSubmit } = useForm();
  const {
    setLoading,
    setError,
    setResult,
    error,
    result,
  } = usePersonalQueryStore();

  const apiKey = useApiKey();

  const onSubmit = async (data: any) => {
    if (!apiKey) return;

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const response = await queryByPersonalData(
        {
          name: data.name,
          first_surname: data.first_surname,
          last_surname: data.last_surname,
          birthdate: data.birthdate,
          gender: data.gender,
          state: data.state,
        },
        apiKey
      );

      if (response.errors) {
        setError('Los datos no coinciden con ningún registro.');
      } else {
        setResult(response.data);
      }
    } catch (err) {
      setError('Hubo un error al consultar los datos personales.');
    } finally {
      setLoading(false);
    }
  };

  if (!apiKey) {
    return (
      <Typography color="error" mt={4}>
        Falta el parámetro APIKey en la URL. Este widget requiere una API Key válida para funcionar.
      </Typography>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        name="name"
        label="Nombre"
        control={control}
        rules={{ required: 'Campo obligatorio' }}
      />

      <Input
        name="first_surname"
        label="Primer apellido"
        control={control}
        rules={{ required: 'Campo obligatorio' }}
      />

      <Input
        name="last_surname"
        label="Segundo apellido"
        control={control}
        rules={{ required: 'Campo obligatorio' }}
      />

      <InputDate
        name="birthdate"
        label="Fecha de nacimiento"
        control={control}
        rules={{ required: 'Campo obligatorio' }}
      />

      <Dropdown
        name="gender"
        label="Género"
        control={control}
        options={genderOptions}
        rules={{ required: 'Selecciona una opción' }}
      />

      <Dropdown
        name="state"
        label="Estado de nacimiento"
        control={control}
        options={MEXICAN_STATES}
        rules={{ required: 'Selecciona un estado' }}
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

export default PersonalFormPage;
