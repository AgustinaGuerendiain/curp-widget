import { create } from 'zustand';

interface UseApiKeyStore {
  apiKey: string | null;
  setApiKey: (key: string) => void;
}

export const useApiKeyStore = create<UseApiKeyStore>((set) => ({
  apiKey: null,
  setApiKey: (key) => set({ apiKey: key }),
}));
