import { Paper, Typography, Box, Divider } from '@mui/material';
import type { PersonalData } from '../types/curp';
import { useTranslation } from 'react-i18next';

interface ResultBoxProps {
  data: PersonalData;
}

const ResultBox = ({ data }: ResultBoxProps) => {
  const { t } = useTranslation();

  const fields: { label: string; value: string | undefined }[] = [
    { label: 'CURP', value: data.curp },
    { label: t('results.name_label'), value: data.nombres },
    { label: t('results.surname_label'), value: data.primerApellido },
    { label: t('results.second_surname_label'), value: data.segundoApellido },
    { label: t('results.birth_date_label'), value: data.fechaNacimiento },
    { label: t('results.gender_label'), value: data.sexo },
    { label: t('results.nationality_label'), value: data.nacionalidad },
    { label: t('results.state_label'), value: data.entidad },
  ];

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {t('results.title')}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Box display="flex" flexDirection="column" gap={1}>
        {fields.map(({ label, value }) => (
          <Typography key={label} variant="body2">
            <strong>{label}:</strong> {value}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
};

export default ResultBox;
