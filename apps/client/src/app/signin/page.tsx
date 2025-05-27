"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import { Eye, EyeOff, ArrowRight, Github, Twitter } from "lucide-react";
import axios from "axios";
import { HTTP_URL } from "../config";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    if(!email || !password){
        alert("Incomplete credentials");
        return;
    }
    const response = await axios.post(`${HTTP_URL}/signin`, {
        username: email,
        password: password
    });

    console.log(response.data);
    localStorage.setItem("token", response.data.token)
    router.push('/lobby')
    console.log({ email, password, rememberMe });
  };

  return (
    <AuthLayout
      title="Sign In"
      subtitle="Welcome back! Sign in to access your workspace."
    >
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <div className="mt-1 relative">
              <input
                id="email"
                name="email"
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg 
                           focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500
                           placeholder-gray-500 transition-all duration-200
                           backdrop-blur-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pr-10 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg 
                           focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500
                           placeholder-gray-500 transition-all duration-200
                           backdrop-blur-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-fuchsia-600 focus:ring-fuchsia-500 border-gray-700 rounded bg-gray-900"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-fuchsia-400 hover:text-fuchsia-300 transition-colors">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent
                     rounded-lg text-white bg-fuchsia-600 hover:bg-fuchsia-700 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500
                     font-medium transition-all duration-200 shadow-lg shadow-fuchsia-800/20
                     hover:shadow-fuchsia-700/40"
          >
            <span className="absolute right-3 inset-y-0 flex items-center pl-3">
              <ArrowRight className="h-5 w-5 opacity-80 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
            Sign in
          </button>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <a
                href="#"
                className="w-full inline-flex justify-center py-2.5 px-4 rounded-lg bg-gray-800 
                           hover:bg-gray-700 focus:ring-2 focus:ring-gray-600
                           text-sm font-medium text-white transition-all duration-200"
              >
                <Github className="h-5 w-5 mr-2" />
                <span>GitHub</span>
              </a>
            </div>
            <div>
              <a
                href="#"
                className="w-full inline-flex justify-center py-2.5 px-4 rounded-lg bg-[#1DA1F2] 
                           hover:bg-[#1a94df] focus:ring-2 focus:ring-[#1DA1F2]/50
                           text-sm font-medium text-white transition-all duration-200"
              >
                <Twitter className="h-5 w-5 mr-2" />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-gray-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}