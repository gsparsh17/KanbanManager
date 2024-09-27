'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';  // This is from 'next/navigation', not 'next/router'

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); 
  const { theme, setTheme } = useTheme(); // Correct useRouter from 'next/navigation'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send login request to backend
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data) {
        // Store the token in local storage
        localStorage.setItem('token', data.token);

        // Redirect to the protected page (e.g., homepage)
        router.push('/');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ease-in-out w-full ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900'
        : 'bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200'
    }`}>
      <div className="p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center">
        <h1 className={`text-3xl font-extrabold text-center mb-6 animate-fade-in-down bg-clip-text text-transparent ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-purple-400 to-pink-600'
            : 'bg-gradient-to-r from-purple-600 to-blue-600'
        }`}>Login</h1>
    
        {error && (
          <div className={`border-l-4 p-4 mb-6 rounded-lg shadow-md animate-fade-in ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-red-900 to-pink-900 border-red-700 text-red-100'
              : 'bg-gradient-to-r from-red-100 to-pink-100 border-red-500 text-red-700'
          }`} role="alert">
            <p className="font-bold text-lg mb-2">Error</p>
            <p>{error}</p>
            <button 
              onClick={() => setError(null)}
              className="absolute top-0 right-0 mt-4 mr-4 text-red-500 hover:text-red-700 transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
    
        <form onSubmit={handleLogin} className={`bg-white p-6 rounded-lg shadow-md w-96 transition-all duration-300 ease-in-out ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
    
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
    
          <button
            type="submit"
            className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              theme === 'dark' ? 'bg-indigo-700' : 'bg-indigo-600'
            }`}
          >
            Login
          </button>
          <p className="mt-4 text-center text-sm">
            Do not have an account?{' '}
            <a href="/signup" className="text-indigo-600 hover:text-indigo-800">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>    
  );
}
