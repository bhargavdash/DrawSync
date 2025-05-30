"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner = ({
  size = "md",
  className,
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Outer spinning ring */}
      <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-transparent border-magenta-500 animate-spin duration-1000"></div>
      
      {/* Middle spinning ring */}
      <div className="absolute inset-1 rounded-full border-t-2 border-l-2 border-transparent border-magenta-400 animate-spin duration-700 animate-reverse"></div>
      
      {/* Inner glowing circle */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-magenta-600/80 to-purple-800/50 animate-pulse"></div>
      
      {/* Center dot */}
      <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-white/90 animate-ping"></div>
    </div>
  );
};

// Add custom colors to tailwind
const addCustomStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes spin-reverse {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(-360deg);
      }
    }
    .animate-reverse {
      animation-direction: reverse;
    }
    .border-magenta-400 {
      border-color: rgb(236, 72, 153);
    }
    .border-magenta-500 {
      border-color: rgb(219, 39, 119);
    }
    .from-magenta-600\/80 {
      --tw-gradient-from: rgb(214, 31, 105, 0.8);
    }
    .to-purple-800\/50 {
      --tw-gradient-to: rgb(107, 33, 168, 0.5);
    }
  `;
  document.head.appendChild(style);
};

// Run this once when component is first imported
if (typeof window !== "undefined") {
  addCustomStyles();
}