
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permissionName: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Données de démonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@communaute.fr',
    name: 'Administrateur',
    role: 'admin',
    permissions: [
      { id: '1', name: 'manage_sessions', description: 'Gérer les séances', enabled: true },
      { id: '2', name: 'manage_attendance', description: 'Gérer les présences', enabled: true },
      { id: '3', name: 'view_statistics', description: 'Voir les statistiques', enabled: true },
      { id: '4', name: 'manage_members', description: 'Gérer les membres', enabled: true },
      { id: '5', name: 'manage_events', description: 'Gérer les événements', enabled: true },
    ]
  },
  {
    id: '2',
    email: 'permanent@communaute.fr',
    name: 'Permanent',
    role: 'permanent',
    permissions: [
      { id: '1', name: 'manage_sessions', description: 'Gérer les séances', enabled: true },
      { id: '2', name: 'manage_attendance', description: 'Gérer les présences', enabled: true },
      { id: '6', name: 'discipleship', description: 'Discipolat', enabled: true },
      { id: '5', name: 'manage_events', description: 'Gérer les événements', enabled: true },
    ]
  },
  {
    id: '3',
    email: 'membre@communaute.fr',
    name: 'Membre Standard',
    role: 'standard',
    permissions: [
      { id: '7', name: 'view_sessions', description: 'Voir les séances', enabled: true },
      { id: '8', name: 'view_events', description: 'Voir les événements', enabled: true },
    ]
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setAuthState({
        user: JSON.parse(savedUser),
        isAuthenticated: true,
        isLoading: false
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulation d'une connexion
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'password') {
      localStorage.setItem('currentUser', JSON.stringify(user));
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  const hasPermission = (permissionName: string): boolean => {
    return authState.user?.permissions.some(p => p.name === permissionName && p.enabled) || false;
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      hasPermission
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
