import { useCallback, useState } from "react";
import { UseFetch } from "../types";
import { useApiKey } from "./useApiKey";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

const useFetch = <T>(
  url: string
): [UseFetch<T>, (options?: RequestInit) => Promise<void>] => {
  const { apiKey } = useApiKey();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    async (options?: RequestInit) => {
      setIsLoading(true);

      try {
        if (!apiKey) {
          throw new Error("API key is missing.");
        }

        const response = await fetch(url, {
          ...options,
          headers: {
            "X-Api-key": apiKey,
            ...DEFAULT_HEADERS,
            ...options?.headers,
          },
        });

        if (!response.ok) {
          throw new Error("The response was not ok.");
        }

        const result = await response.json();
        setData(result);
      } catch (error: unknown) {
        setData(null);

        if (error instanceof Error) {
          setError(error.message);
        } else if (typeof error === "string") {
          setError(error);
        } else {
          setError("Unknown error");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [apiKey, url]
  );

  return [
    {
      data,
      error,
      isLoading,
    },
    fetchData,
  ];
};

export default useFetch;
