"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner = ({ size = "md", className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-transparent border-(--color-accent) animate-spin" />
      <div
        className="absolute inset-1 rounded-full border-t-2 border-l-2 border-transparent border-(--color-pen-amber) animate-spin"
        style={{ animationDirection: "reverse", animationDuration: "700ms" }}
      />
      <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-(--color-ink)" />
    </div>
  );
};
