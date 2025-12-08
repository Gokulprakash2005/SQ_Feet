'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type AuthMode = 'login' | 'signup'

export default function AdminAuth() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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

    // Check demo admin credentials
    if (loginData.email === 'admin@sqfeet.com' && loginData.password === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true')
      setTimeout(() => {
        router.push('/admin')
      }, 500)
      return
    }

    // Check registered users
    try {
      const users = JSON.parse(localStorage.getItem('sqfeet_users') || '[]')
      const user = users.find((u: any) => u.email === loginData.email && u.password === loginData.password)
      
      if (user) {
        localStorage.setItem('isAuthenticated', 'true')
        setTimeout(() => {
          router.push('/admin')
        }, 500)
      } else {
        setError('Invalid email or password')
        setLoading(false)
      }
    } catch (error) {
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

    // Save user data to localStorage (demo purpose - replace with actual API call)
    try {
      const users = JSON.parse(localStorage.getItem('sqfeet_users') || '[]')
      
      // Check if email already exists
      if (users.some((user: any) => user.email === signupData.email)) {
        setError('Email already registered')
        setLoading(false)
        return
      }

      // Add new user
      users.push({
        fullName: signupData.fullName,
        email: signupData.email,
        password: signupData.password, // In production, this should be hashed
        createdAt: new Date().toISOString()
      })

      localStorage.setItem('sqfeet_users', JSON.stringify(users))
      localStorage.setItem('isAuthenticated', 'true')
      
      setTimeout(() => {
        router.push('/admin')
      }, 500)
    } catch (error) {
      setError('Failed to create account. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
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
                    <div className="relative">
                      <input
                        id="login-password"
                        type={showLoginPassword ? "text" : "password"}
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                        placeholder="••••••••"
                        className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-300 bg-slate-50 
                                 text-slate-800 placeholder-slate-400
                                 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                                 transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showLoginPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
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
                             py-3.5 px-6 rounded-2xl transition-all duration-200
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
                    <div className="relative">
                      <input
                        id="signup-password"
                        type={showSignupPassword ? "text" : "password"}
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                        placeholder="••••••••"
                        className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-300 bg-slate-50 
                                 text-slate-800 placeholder-slate-400
                                 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                                 transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showSignupPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
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
                    <div className="relative">
                      <input
                        id="signup-confirm"
                        type={showConfirmPassword ? "text" : "password"}
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        required
                        placeholder="••••••••"
                        className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-300 bg-slate-50 
                                 text-slate-800 placeholder-slate-400
                                 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                                 transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
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
