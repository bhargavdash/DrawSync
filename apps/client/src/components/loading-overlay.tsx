"use client";

import React, { useEffect } from "react";
import { LoadingSpinner } from "./loading-spinner";
import { useLoading } from "@/hooks/useLoading";

export const LoadingOverlay = () => {
  const { isLoading, message } = useLoading();
  
  // Prevent scrolling when overlay is shown
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-300">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"></div>
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 animate-in zoom-in-50 duration-300">
        {/* Custom spinner */}
        <LoadingSpinner size="lg" className="drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
        
        {/* Animated text lines */}
        <div className="flex flex-col items-center">
          {message ? (
            <p className="text-white/90 text-lg font-medium tracking-wide animate-pulse">
              {message}
            </p>
          ) : (
            <div className="space-y-1 text-center">
              <p className="text-white/90 text-lg font-medium tracking-wide animate-pulse">
                Loading
              </p>
              <div className="flex justify-center space-x-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-magenta-400 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-magenta-400 animate-bounce" style={{ animationDelay: "100ms" }}></span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-magenta-400 animate-bounce" style={{ animationDelay: "200ms" }}></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add custom animation classes
const addCustomStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes animate-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes zoom-in-50 {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .animate-in {
      animation-fill-mode: both;
    }
    .fade-in {
      animation-name: fade-in;
    }
    .zoom-in-50 {
      animation-name: zoom-in-50;
    }
    .duration-200 {
      animation-duration: 200ms;
    }
    .duration-300 {
      animation-duration: 300ms;
    }
    .bg-magenta-400 {
      background-color: rgb(236, 72, 153);
    }
  `;
  document.head.appendChild(style);
};

// Run this once when component is first imported
if (typeof window !== "undefined") {
  addCustomStyles();
}