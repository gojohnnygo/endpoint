import { useContext } from "react";
import { ApiKeyContextType, ApiKeyContext } from "../providers/apiKeyProvider";

export const useApiKey = (): ApiKeyContextType => {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error("useApiKey must be used within an ApiKeyProvider");
  }
  return context;
};
