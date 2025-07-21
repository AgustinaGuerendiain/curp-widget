import { useEffect, useState } from 'react';

const STORAGE_KEY = 'curpHistory';

export const useCurpHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const addCurp = (curp: string) => {
    setHistory((prev) => {
      if (prev.includes(curp)) return prev;
      const updated = [curp, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { history, addCurp };
};
