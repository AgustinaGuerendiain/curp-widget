import { Box, Container, Tab, Tabs } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '../navigation/paths';

const Home = () => {
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
         <Tab label="Por CURP" value={PATHS.CURP} />
        <Tab label="Por Datos Personales" value={PATHS.PERSONAL} />
       </Tabs>

       <Box mt={4}>
         <Outlet />
       </Box>
    </Container>
  )
}

export default Home
