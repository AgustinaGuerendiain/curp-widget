import { Alert, Box, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { queryByPersonalData } from '../services/curpService';
import { MEXICAN_STATES } from '../const';
import { useTranslation } from 'react-i18next';
import { PATHS } from '../navigation/paths';
import { useCurpHistory } from '../hooks/useCurpHistory';
import { CustomButton, Dropdown, Input, InputDate } from '../components';
import { useApiKeyStore, usePersonalQueryStore } from '../store';

const genderOptions = [
  { label: 'Masculino', value: 'H' },
  { label: 'Femenino', value: 'M' },
];

const PersonalFormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    mode: 'all',
  });
  const { setLoading, setError, setResult, error, loading } =
    usePersonalQueryStore();
  const apiKey = useApiKeyStore((state) => state.apiKey);
  const { addCurp } = useCurpHistory();

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

        if (response.data?.personal_data?.curp) {
          addCurp(response.data.personal_data.curp);
        }

        window.parent.postMessage(
          { event: 'curpValidated', payload: response.data },
          '*'
        );
      }
    } catch (err) {
      setError('Hubo un error al consultar los datos personales.');
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
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
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
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
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
        </Grid>
        <CustomButton loading={loading}>{t('validate_button')}</CustomButton>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default PersonalFormPage;
