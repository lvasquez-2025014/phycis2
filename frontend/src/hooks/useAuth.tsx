import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserDTO, UserRole } from '@fisica-tareas/shared';
import { authService } from '../services/authService';

interface AuthContextType {
  user: UserDTO;
  switchRole: (role: UserRole) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDTO>(() => authService.getCurrentUser());

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  const switchRole = (newRole: UserRole) => {
    const updated = authService.switchDemoRole(newRole);
    setUser(updated);
  };

  const login = async (email: string, password: string) => {
    const res = await authService.login(email, password);
    setUser(res.user);
  };

  const logout = () => {
    authService.logout();
    setUser(authService.getCurrentUser());
  };

  return (
    <AuthContext.Provider value={{ user, switchRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
