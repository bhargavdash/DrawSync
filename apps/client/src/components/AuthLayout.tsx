"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Pen, Square } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}


export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  // Animate elements on page load
  useEffect(() => {
    const animatedElements = document.querySelectorAll("[data-animate]");
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
    
    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(120,20,120,0.15),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(120,20,120,0.15),transparent_50%)]"></div>
        <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-fuchsia-900/10 blur-3xl"></div>
        <div className="absolute -bottom-[30%] -right-[20%] w-[60%] h-[60%] rounded-full bg-fuchsia-900/10 blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div>
          <Link href="/" className="flex items-center text-xl font-bold">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gray-800 mr-2">
              <div className="relative">
                <Pen className="h-5 w-5 text-fuchsia-400 absolute -top-0.5 -left-0.5" />
                <Square className="h-5 w-5 text-white absolute -bottom-0.5 -right-0.5" />
              </div>
            </div>
            <span className="bg-gradient-to-r from-white to-fuchsia-400 bg-clip-text text-transparent">
              DrawSync
            </span>
          </Link>
        </div>
        <div className="hidden sm:block">
          <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Back to home
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 relative">
          {/* Content Card */}
          <div 
            data-animate="fade-up"
            className="bg-gray-800/40 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-gray-700/50 
                      opacity-0 translate-y-4 transition-all duration-700 ease-out"
          >
            {/* Title section */}
            <div className="text-center mb-8">
              <h2 
                data-animate="fade-up"
                className="text-3xl font-extrabold bg-gradient-to-r from-white to-fuchsia-400 bg-clip-text text-transparent
                           opacity-0 translate-y-4 transition-all duration-700 ease-out delay-100"
              >
                {title}
              </h2>
              <p 
                data-animate="fade-up"
                className="mt-2 text-sm text-gray-400 max-w-sm mx-auto
                           opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200"
              >
                {subtitle}
              </p>
            </div>

            {/* Form content */}
            <div 
              data-animate="fade-up"
              className="opacity-0 translate-y-4 transition-all duration-700 ease-out delay-300"
            >
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-xs">
        <p>© {new Date().getFullYear()} DrawSync. All rights reserved.</p>
      </footer>
    </div>
  );
}