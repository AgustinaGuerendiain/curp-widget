import { useLocation } from "react-router-dom";

export const useApiKey = (): string | null => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  return params.get("APIKey");
};
