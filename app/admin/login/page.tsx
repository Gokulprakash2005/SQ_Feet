"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // TODO: Replace with actual authentication logic
    // For now, simple demo credentials
    if (email === "admin@sqfeet.com" && password === "admin123") {
      setTimeout(() => {
        router.push("/admin");
      }, 500);
    } else {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-stone-50 to-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            SQ<span className="text-amber-500">.</span>Feet
          </h1>
          <p className="text-slate-600 text-sm">Admin Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">
              Welcome Back
            </h2>
            <p className="text-slate-600 text-sm">
              Sign in to manage your properties
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@sqfeet.com"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 
                         text-slate-800 placeholder-slate-400
                         focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                         transition-all duration-200"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 
                         text-slate-800 placeholder-slate-400
                         focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                         transition-all duration-200"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 text-amber-500 
                           focus:ring-2 focus:ring-amber-500 focus:ring-offset-0"
                />
                <span className="text-slate-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold
                       py-3.5 px-6 rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Demo Credentials & Sign Up Link */}
          <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
            <p className="text-xs text-slate-500 text-center">
              Demo credentials: admin@sqfeet.com / admin123
            </p>
            <p className="text-sm text-slate-600 text-center">
              Don't have an account?{" "}
              <Link
                href="/admin/signup"
                className="text-amber-600 hover:text-amber-700 font-semibold transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-slate-600 text-sm mt-6">
          Turning Your Real Estate Dreams to Reality
        </p>
      </div>
    </div>
  );
}
