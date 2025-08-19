'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  confirm: (username: string, code: string) => Promise<boolean>;
  signup: (username: string, password: string, email: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<boolean>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signup = async (username: string, password: string, email: string) => {
    try {
      // Simulate API call - replace with actual registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  }

  const confirm = async (username: string, code: string) => {
    try {
      // Simulate API call - replace with actual registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  }

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call - replace with actual authentication
      if (username === 'demo' && password === 'password') {
        const userData: User = {
          id: '1',
          username: 'demo',
          email: 'demo@example.com',
          isConfirmed: true,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const forgotPassword = async (email: string) => {
    try {
      // Simulate API call - replace with actual forgot password
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error('Forgot password error:', error);
      return false;
    }
  }

  const resetPassword = async (email: string, code: string, newPassword: string) => {
    try {
      // Simulate API call - replace with actual reset password
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error('Reset password error:', error);
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{ 
        user, login, logout, isAuthenticated: !!user, confirm, signup, forgotPassword, resetPassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 