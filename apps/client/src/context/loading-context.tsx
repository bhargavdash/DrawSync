"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  message: string | null;
  setLoadingWithMessage: (loading: boolean, message?: string | null) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
    if (!loading) {
      setMessage(null);
    }
  }, []);

  const setLoadingWithMessage = useCallback(
    (loading: boolean, message: string | null = null) => {
      setIsLoading(loading);
      setMessage(message);
      if (!loading) {
        setMessage(null);
      }
    },
    []
  );

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setLoading,
        message,
        setLoadingWithMessage,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoadingContext must be used within a LoadingProvider");
  }
  return context;
};