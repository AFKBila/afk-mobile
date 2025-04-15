import { useState, useCallback } from "react";

export const useLoading = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);

  const withLoading = useCallback(async (callback: () => Promise<void>) => {
    try {
      setIsLoading(true);
      await callback();
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, withLoading };
};
