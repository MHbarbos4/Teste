import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: 1,
    email: 'admin@empresa.com',
    nome: 'Administrador Sistema',
    perfil: 'Admin'
  },
  {
    id: 2,
    email: 'gestor@empresa.com',
    nome: 'João Gestor Silva',
    perfil: 'Gestor'
  },
  {
    id: 3,
    email: 'visualizador@empresa.com',
    nome: 'Maria Visualizadora',
    perfil: 'Visualizador'
  }
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would call your API
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === '123456') { // Mock password
      const userWithToken = {
        ...foundUser,
        token: 'mock-jwt-token-' + Date.now()
      };
      
      setUser(userWithToken);
      localStorage.setItem('user', JSON.stringify(userWithToken));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};