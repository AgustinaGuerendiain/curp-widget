import { Box, Container, Tab, Tabs } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '../navigation/paths';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ pt: 4 }}>
       <Tabs
         value={location.pathname}
         onChange={(_, value) => navigate(value)}
         centered
         variant="fullWidth"
       >
         <Tab label={t('tab1_label')} value={PATHS.CURP} />
         <Tab label={t('tab2_label')} value={PATHS.PERSONAL} />
       </Tabs>

       <Box mt={1}>
         <Outlet />
       </Box>
    </Container>
  )
}

export default Home
