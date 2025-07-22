import { create } from 'zustand';

interface UseApiKeyStore {
  apiKey: string | null;
  setApiKey: (key: string) => void;
}

const useApiKeyStore = create<UseApiKeyStore>((set) => ({
  apiKey: null,
  setApiKey: (key) => set({ apiKey: key }),
}));

export default useApiKeyStore;
