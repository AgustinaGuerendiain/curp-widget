import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import InputDate from '../components/InputDate';
import CustomButton from '../components/Button';
import { queryByPersonalData } from '../services/curpService';
import { usePersonalQueryStore } from '../store/usePersonalQueryStore';
import { useApiKeyStore } from '../store/useApiKeyStore';
import { MEXICAN_STATES } from '../const';
import { useTranslation } from 'react-i18next';
import { PATHS } from '../navigation/paths';

const genderOptions = [
  { label: 'Masculino', value: 'H' },
  { label: 'Femenino', value: 'M' },
];

const PersonalFormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm();
  const { setLoading, setError, setResult, error } = usePersonalQueryStore();
  const apiKey = useApiKeyStore((state) => state.apiKey);

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
        navigate(PATHS.RESULTS);
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
        {t('missing_api_key')}
      </Typography>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        name="name"
        label={t('form.name_label')}
        control={control}
        rules={{ required: t('form.name_required') }}
      />

      <Input
        name="first_surname"
        label={t('form.surname_label')}
        control={control}
        rules={{ required: t('form.surname_required') }}
      />

      <Input
        name="last_surname"
        label={t('form.second_surname_label')}
        control={control}
        rules={{ required: t('form.second_surname_required') }}
      />

      <InputDate
        name="birthdate"
        label={t('form.birth_date_label')}
        control={control}
        rules={{ required: t('form.birth_date_required') }}
      />

      <Dropdown
        name="gender"
        label={t('form.gender_label')}
        control={control}
        options={genderOptions}
        rules={{ required: t('form.gender_required') }}
      />

      <Dropdown
        name="state"
        label={t('form.state_label')}
        control={control}
        options={MEXICAN_STATES}
        rules={{ required: t('form.state_required') }}
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

export default PersonalFormPage;
