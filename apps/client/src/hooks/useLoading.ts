"use client";

import { useCallback } from "react";
import { useLoadingContext } from "@/context/loading-context";

export const useLoading = () => {
  const { isLoading, setLoading, message, setLoadingWithMessage } = useLoadingContext();

  const startLoading = useCallback((message?: string) => {
    setLoadingWithMessage(true, message || null);
  }, [setLoadingWithMessage]);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  return {
    isLoading,
    startLoading,
    stopLoading,
    message,
  };
};