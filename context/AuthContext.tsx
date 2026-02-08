import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, role: 'admin' | 'client') => User;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, role: 'admin' | 'client') => {
    // Mock login logic
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: role === 'admin' ? 'Admin Saney' : 'Client Test',
      email: email,
      role: role,
      createdAt: new Date().toISOString(),
      avatar: 'https://ui-avatars.com/api/?name=' + (role === 'admin' ? 'Admin' : 'Client')
    };
    setUser(newUser);
    localStorage.setItem('saney_user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('saney_user');
  };

  // Restore user from local storage on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('saney_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
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
