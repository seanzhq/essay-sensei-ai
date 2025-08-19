'use client';

import React, { useState } from 'react';
import { AuthView } from '../../types/auth';
import { useAuth } from '../../contexts/AuthContext';

interface PasswordResetRequestFormProps {
  onViewChange: (view: AuthView) => void;
  setEmail: (email: string) => void;
}

export default function PasswordResetRequestForm({ onViewChange, setEmail }: PasswordResetRequestFormProps) {
  const [email, setEmailLocal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { forgotPassword } = useAuth(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await forgotPassword(email);
      
      if (!success) {
        setError('Invalid code for password reset');
      }
      
      setEmail(email);
      setSuccess(true);
      
      // Auto-navigate to password reset form after a delay
      setTimeout(() => {
        onViewChange('password-reset');
      }, 2000);
    } catch (err) {
      setError('Failed to send reset code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          Reset code sent successfully! Redirecting...
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmailLocal(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="Enter your email address"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Sending...' : 'Send Reset Code'}
      </button>

      <div className="text-center text-gray-600 text-sm">
        Remember your password?{' '}
        <button
          type="button"
          onClick={() => onViewChange('login')}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Sign in
        </button>
      </div>
    </form>
  );
} 