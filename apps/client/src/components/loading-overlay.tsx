"use client";

import React, { useEffect } from "react";
import { LoadingSpinner } from "./loading-spinner";
import { useLoading } from "@/hooks/useLoading";

export const LoadingOverlay = () => {
  const { isLoading, message } = useLoading();

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-(--color-bg)/80 backdrop-blur-sm" />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-(--color-ink) text-sm font-medium">{message || "Loading"}</p>
      </div>
    </div>
  );
};
