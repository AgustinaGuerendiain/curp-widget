import { Alert, Grid } from '@mui/material';
import { queryByPersonalData } from '../services/curpService';
import { GENDER_OPTIONS, MEXICAN_STATES } from '../const';
import { useTranslation } from 'react-i18next';
import {
  CustomButton,
  Dropdown,
  FormWrapper,
  Input,
  InputDate,
} from '../components';
import { useApiKeyStore, usePersonalQueryStore } from '../store';
import { useFormHook } from '../hooks';

const PersonalFormPage = () => {
  const { t } = useTranslation();

  const { setLoading, setError, setResult, error, loading } =
    usePersonalQueryStore();

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
        handleError(t('no_personal_data'));
      } else {
        handleSuccess(response.data);
      }
    } catch (err) {
      handleError(t('error.error_personal_data'));
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
      <Grid container spacing={{ xs: 0, sm: 2 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input
            name="name"
            label={t('form.name_label')}
            rules={{ required: t('form.name_required') }}
          />

          <Input
            name="first_surname"
            label={t('form.surname_label')}
            rules={{ required: t('form.surname_required') }}
          />

          <Input
            name="last_surname"
            label={t('form.second_surname_label')}
            rules={{ required: t('form.second_surname_required') }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputDate
            name="birthdate"
            label={t('form.birth_date_label')}
            rules={{ required: t('form.birth_date_required') }}
          />

          <Dropdown
            name="gender"
            label={t('form.gender_label')}
            options={GENDER_OPTIONS}
            rules={{ required: t('form.gender_required') }}
          />

          <Dropdown
            name="state"
            label={t('form.state_label')}
            options={MEXICAN_STATES}
            rules={{ required: t('form.state_required') }}
          />
        </Grid>
      </Grid>
    </FormWrapper>
  );
};

export default PersonalFormPage;
