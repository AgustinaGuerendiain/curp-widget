import { Paper, Typography, Box, Divider } from '@mui/material';
import type { PersonalData } from '../types/curp';


interface ResultBoxProps {
  data: PersonalData;
}

const ResultBox = ({ data }: ResultBoxProps) => {
  return (
    <Paper elevation={2} sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Resultado de búsqueda
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="body2"><strong>CURP:</strong> {data.curp}</Typography>
        <Typography variant="body2"><strong>Nombre:</strong> {data.nombres}</Typography>
        <Typography variant="body2"><strong>Primer apellido:</strong> {data.primerApellido}</Typography>
        <Typography variant="body2"><strong>Segundo apellido:</strong> {data.segundoApellido}</Typography>
        <Typography variant="body2"><strong>Fecha de nacimiento:</strong> {data.fechaNacimiento}</Typography>
        <Typography variant="body2"><strong>Sexo:</strong> {data.sexo}</Typography>
        <Typography variant="body2"><strong>Nacionalidad:</strong> {data.nacionalidad}</Typography>
        <Typography variant="body2"><strong>Entidad de nacimiento:</strong> {data.entidad}</Typography>
      </Box>
    </Paper>
  );
};

export default ResultBox;
