import { useLocation, Navigate } from 'react-router-dom';
import { PATHS } from './paths';

const RedirectToCurp = () => {
  const location = useLocation();
  return <Navigate to={`${PATHS.CURP}${location.search}`} replace />;
};

export default RedirectToCurp;