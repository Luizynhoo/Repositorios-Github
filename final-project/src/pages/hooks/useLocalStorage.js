// Hook que posso utilizar futuramente para troca de temas 
// ou salvar preferências do usuário

import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Erro ao ler o localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
