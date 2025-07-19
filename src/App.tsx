import { useEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { routes } from './navigation/routes';
import { useApiKeyStore } from './store/useApiKeyStore';
import i18n from './i18n';

function App() {
  const location = useLocation();
  const setApiKey = useApiKeyStore((state) => state.setApiKey);
  const routing = useRoutes(routes);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyFromUrl = params.get('APIKey');
    const keyFromStorage = localStorage.getItem('APIKey');

    if (keyFromUrl) {
      setApiKey(keyFromUrl);
      localStorage.setItem('APIKey', keyFromUrl);
    } else if (keyFromStorage) {
      setApiKey(keyFromStorage);
    }

    const lang = params.get('lang');
    if (lang === 'es' || lang === 'en') {
      i18n.changeLanguage(lang);
    }

  }, [location.search, setApiKey]);

  return routing;
}

export default App;
