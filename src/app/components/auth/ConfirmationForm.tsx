'use client';

import React, { useState } from 'react';
import { AuthView } from '../../types/auth';
import { useAuth } from '../../contexts/AuthContext';

interface ConfirmationFormProps {
  onViewChange: (view: AuthView) => void;
  email: string;
}

export default function ConfirmationForm({ onViewChange, email }: ConfirmationFormProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);
  const { confirm } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await confirm(email, code);
      
      if (success) {
        onViewChange('login');
      } else {
        setError('Invalid confirmation code');
      }
    } catch (err) {
      setError('Confirmation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      // Simulate API call - replace with actual resend
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Show success message or handle as needed
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          We've sent a confirmation code to <span className="font-medium">{email}</span>
        </p>
      </div>

      <div>
        <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
          Confirmation Code
        </label>
        <input
          id="code"
          type="text"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-center text-lg tracking-widest"
          placeholder="000000"
          maxLength={6}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Verifying...' : 'Verify Email'}
      </button>

      <div className="text-center space-y-3">
        <button
          type="button"
          onClick={handleResendCode}
          disabled={isResending}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium disabled:opacity-50"
        >
          {isResending ? 'Sending...' : "Didn't receive the code? Resend"}
        </button>
        
        <div className="text-gray-600 text-sm">
          <button
            type="button"
            onClick={() => onViewChange('login')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to login
          </button>
        </div>
      </div>
    </form>
  );
} 