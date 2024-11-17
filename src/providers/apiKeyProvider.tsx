import React, { createContext, useState, ReactNode } from "react";

export interface ApiKeyContextType {
  apiKey: string | undefined;
  setApiKey: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const ApiKeyContext = createContext<ApiKeyContextType | undefined>(
  undefined
);

export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
  const [apiKey, setApiKey] = useState<string | undefined>();

  const value = {
    apiKey,
    setApiKey,
  };

  return (
    <ApiKeyContext.Provider value={value}>{children}</ApiKeyContext.Provider>
  );
};
