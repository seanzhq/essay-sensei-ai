'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { AuthView } from '../types/auth';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import ConfirmationForm from '../components/auth/ConfirmationForm';
import PasswordResetRequestForm from '../components/auth/PasswordResetRequestForm';
import PasswordResetForm from '../components/auth/PasswordResetForm';

export default function AuthPage() {
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <LoginForm onViewChange={setCurrentView} />;
      case 'register':
        return <RegisterForm onViewChange={setCurrentView} setEmail={setEmail} />;
      case 'confirm':
        return <ConfirmationForm onViewChange={setCurrentView} email={email} />;
      case 'password-reset-request':
        return <PasswordResetRequestForm onViewChange={setCurrentView} setEmail={setEmail} />;
      case 'password-reset':
        return <PasswordResetForm onViewChange={setCurrentView} email={email} />;
      default:
        return <LoginForm onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentView === 'login' && 'Welcome Back'}
            {currentView === 'register' && 'Create Account'}
            {currentView === 'confirm' && 'Verify Email'}
            {currentView === 'password-reset-request' && 'Reset Password'}
            {currentView === 'password-reset' && 'Set New Password'}
          </h1>
          <p className="text-gray-600">
            {currentView === 'login' && 'Sign in to your account'}
            {currentView === 'register' && 'Join us today'}
            {currentView === 'confirm' && 'Enter the code sent to your email'}
            {currentView === 'password-reset-request' && 'Enter your email to receive a reset code'}
            {currentView === 'password-reset' && 'Enter your new password'}
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {renderView()}
        </div>
      </div>
    </div>
  );
}