import { useNavigate } from 'react-router-dom';
import { PATHS } from '../navigation/paths';
import useCurpHistory from './useCurpHistory';

const useFormHook = ({ setError, setResult }: any) => {
  const navigate = useNavigate();
  const { addCurp } = useCurpHistory();

  const handleSuccess = (response: any) => {
    setResult(response.data);
    navigate(PATHS.RESULTS);

    const curp = response.data?.personal_data?.curp;
    if (curp) addCurp(curp);

    window.parent.postMessage(
      { event: 'curpValidated', payload: response.data },
      '*'
    );
  };

  const handleError = (message: string) => {
    setError(message);
  };

  return { handleSuccess, handleError };
};

export default useFormHook;
