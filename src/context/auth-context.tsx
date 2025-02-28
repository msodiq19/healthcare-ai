'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { getToken, setToken, removeToken } from '../lib/utils';
import { login as apiLogin, register as apiRegister, ILoginPayload, IRegisterPayload } from '@/services';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (payload: ILoginPayload) => Promise<void>;
  register: (payload: IRegisterPayload) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = getToken('accessToken');
    const userStr = getToken('user');
    
    if (token && userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch (error) {
        console.error('Failed to parse user data', error);
        removeToken('accessToken');
        removeToken('user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (payload: ILoginPayload) => {
    setLoading(true);
    try {
      const data = await apiLogin(payload);
      setToken('accessToken', data.token);
      setToken('user', JSON.stringify(data.user));
      console.log('User:', data);
      setUser(data.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: IRegisterPayload) => {
    setLoading(true);
    try {
      const data = await apiRegister(payload);
      setToken('accessToken', data.token);
      setToken('user', JSON.stringify(data.user));
      setUser(data.user);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeToken('accessToken');
    removeToken('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};