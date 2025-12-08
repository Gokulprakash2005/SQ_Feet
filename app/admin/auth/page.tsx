'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type AuthMode = 'login' | 'signup'

export default function AdminAuth() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  // Signup form state
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false
  })

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // TODO: Replace with actual authentication logic
    if (loginData.email === 'admin@sqfeet.com' && loginData.password === 'admin123') {
      setTimeout(() => {
        router.push('/admin')
      }, 500)
    } else {
      setError('Invalid email or password')
      setLoading(false)
    }
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (signupData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    if (!signupData.agreedToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy')
      return
    }

    setLoading(true)

    // TODO: Replace with actual registration API call
    setTimeout(() => {
      alert('Account created successfully!')
      setMode('login')
      setSignupData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreedToTerms: false
      })
      setLoading(false)
    }, 1000)
  }

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

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Toggle Tabs */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => {
                setMode('login')
                setError('')
              }}
              className={`flex-1 py-4 px-6 font-semibold transition-all duration-200 ${
                mode === 'login'
                  ? 'bg-amber-50 text-amber-600 border-b-2 border-amber-500'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('signup')
                setError('')
              }}
              className={`flex-1 py-4 px-6 font-semibold transition-all duration-200 ${
                mode === 'signup'
                  ? 'bg-amber-50 text-amber-600 border-b-2 border-amber-500'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="p-8">
            {/* Login Form */}
            {mode === 'login' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-1">
                    Welcome Back
                  </h2>
                  <p className="text-slate-600 text-sm">
                    Sign in to manage your properties
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-5">
                  {/* Email Input */}
                  <div>
                    <label 
                      htmlFor="login-email" 
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="login-email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
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
                      htmlFor="login-password" 
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Password
                    </label>
                    <input
                      id="login-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 
                               text-slate-800 placeholder-slate-400
                               focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                               transition-all duration-200"
                    />
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={loginData.rememberMe}
                        onChange={(e) => setLoginData({ ...loginData, rememberMe: e.target.checked })}
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

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

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
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      'Sign In'
                    )}
                  </button>

                  {/* Demo Info */}
                  <p className="text-xs text-slate-500 text-center pt-2">
                    Demo: admin@sqfeet.com / admin123
                  </p>
                </form>
              </div>
            )}

            {/* Signup Form */}
            {mode === 'signup' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-1">
                    Create Account
                  </h2>
                  <p className="text-slate-600 text-sm">
                    Join the property management team
                  </p>
                </div>

                <form onSubmit={handleSignupSubmit} className="space-y-5">
                  {/* Full Name Input */}
                  <div>
                    <label 
                      htmlFor="signup-name" 
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="signup-name"
                      type="text"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 
                               text-slate-800 placeholder-slate-400
                               focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                               transition-all duration-200"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label 
                      htmlFor="signup-email" 
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="signup-email"
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
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
                      htmlFor="signup-password" 
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Password
                    </label>
                    <input
                      id="signup-password"
                      type="password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 
                               text-slate-800 placeholder-slate-400
                               focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                               transition-all duration-200"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Must be at least 8 characters
                    </p>
                  </div>

                  {/* Confirm Password Input */}
                  <div>
                    <label 
                      htmlFor="signup-confirm" 
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="signup-confirm"
                      type="password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-50 
                               text-slate-800 placeholder-slate-400
                               focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                               transition-all duration-200"
                    />
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={signupData.agreedToTerms}
                      onChange={(e) => setSignupData({ ...signupData, agreedToTerms: e.target.checked })}
                      required
                      className="w-4 h-4 mt-0.5 rounded border-slate-300 text-amber-500 
                               focus:ring-2 focus:ring-amber-500 focus:ring-offset-0"
                    />
                    <label className="text-slate-600">
                      I agree to the{' '}
                      <button type="button" className="text-amber-600 hover:text-amber-700 font-medium">
                        Terms of Service
                      </button>
                      {' '}and{' '}
                      <button type="button" className="text-amber-600 hover:text-amber-700 font-medium">
                        Privacy Policy
                      </button>
                    </label>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

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
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </span>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-slate-600 text-sm mt-6">
          Turning Your Real Estate Dreams to Reality
        </p>
      </div>
    </div>
  )
}
