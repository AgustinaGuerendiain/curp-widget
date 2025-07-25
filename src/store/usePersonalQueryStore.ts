import { create } from 'zustand';
import type { CurpResponseData } from '../types/curp';

interface PersonalQueryStore {
  loading: boolean;
  error: string | null;
  result: CurpResponseData | null;
  setLoading: (val: boolean) => void;
  setError: (val: string | null) => void;
  setResult: (val: CurpResponseData | null) => void;
  clear: () => void;
}

const usePersonalQueryStore = create<PersonalQueryStore>((set) => ({
  loading: false,
  error: null,
  result: null,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setResult: (result) => set({ result }),
  clear: () => set({ loading: false, error: null, result: null }),
}));

export default usePersonalQueryStore;
