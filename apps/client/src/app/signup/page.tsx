"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import axios from "axios";
import { HTTP_URL } from "../config";
import { useRouter } from "next/navigation";
import { useLoading } from "@/hooks/useLoading";

const inputClass =
  "block w-full px-3.5 py-2.5 bg-(--color-bg) border border-(--color-line) rounded-md text-sm text-(--color-ink) placeholder-(--color-ink-muted) transition-colors focus:outline-none focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent)";

export default function SignUp() {
  const { startLoading, stopLoading } = useLoading();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password) {
      setError("Fill in your name, email, and password.");
      return;
    }

    startLoading("Creating your account...");
    try {
      await axios.post(`${HTTP_URL}/signup`, {
        username: email,
        password: password,
        name: name,
      });
      await router.push("/signin");
    } catch {
      setError("Couldn't create that account. The email may already be in use.");
    } finally {
      stopLoading();
    }
  };

  return (
    <AuthLayout title="Create an account" subtitle="Start a room, share the link, draw together.">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-sm font-medium text-(--color-ink)">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Jordan Rivera"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-medium text-(--color-ink)">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-sm font-medium text-(--color-ink)">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClass} pr-10`}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-(--color-ink-muted) hover:text-(--color-ink) transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {error && (
          <p role="alert" className="text-sm text-(--color-pen-coral)">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="group w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md bg-(--color-accent) text-(--color-bg) text-sm font-medium hover:brightness-110 transition-[filter]"
        >
          Create account
          <ArrowRight className="h-4 w-4 opacity-80 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-(--color-ink-muted)">
        Already have an account?{" "}
        <Link href="/signin" className="font-medium text-(--color-accent) hover:brightness-110 transition-[filter]">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
