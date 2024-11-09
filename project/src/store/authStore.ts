import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'teacher';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateAvatar: (avatar: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateAvatar: (avatar) => set((state) => ({
    user: state.user ? { ...state.user, avatar } : null
  }))
}));