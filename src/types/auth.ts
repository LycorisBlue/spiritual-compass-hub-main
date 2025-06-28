
export type UserRole = 'admin' | 'permanent' | 'standard';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  avatar?: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
