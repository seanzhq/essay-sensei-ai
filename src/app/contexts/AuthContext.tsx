'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  confirm: (username: string, code: string) => Promise<boolean>;
  signup: (username: string, password: string, email: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
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

  const login = async (email: string, password: string): Promise<boolean> => {
    const loginData = {email: email, password: password};

    try {
        const response = await fetch(`/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(loginData)
        });
  
        if (!response.ok) {
            return false;
        }
        
        const data = await response.json();
        const userData: User = {
            email: email,
            isConfirmed: true,
            access_token: data.access_token,
            id_token: data.id_token,
            refresh_token: data.refresh_token,
            expires_in: data.expires_in,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;

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
        user, isLoading, login, logout, isAuthenticated: !!user, confirm, signup, forgotPassword, resetPassword 
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