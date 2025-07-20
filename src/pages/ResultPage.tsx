import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { useCurpQueryStore } from '../store/useCurpQueryStore';
import { usePersonalQueryStore } from '../store/usePersonalQueryStore';
import { PATHS } from '../navigation/paths';
import ResultBox from '../components/ResultBox';
import { useTranslation } from 'react-i18next';

const ResultPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    result: curpResult,
    setResult: setCurpResult,
    setError: setCurpError,
  } = useCurpQueryStore();

  const {
    result: personalResult,
    setResult: setPersonalResult,
    setError: setPersonalError,
  } = usePersonalQueryStore();

  const result = curpResult || personalResult;

  useEffect(() => {
    if (!result) {
      navigate(PATHS.CURP);
    }
  }, [result, navigate]);

  const handleBack = () => {
    setCurpResult(null);
    setCurpError(null);
    setPersonalResult(null);
    setPersonalError(null);
    navigate(PATHS.CURP);
  };

  if (!result) return null;

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, p: 2 }}>
      <ResultBox data={result.personal_data} />

      <Button
        onClick={handleBack}
        variant="contained"
        sx={{ mt: 3, display: 'block', mx: 'auto' }}
      >
        {t('results.return_button')}
      </Button>
    </Box>
  );
};

export default ResultPage;
