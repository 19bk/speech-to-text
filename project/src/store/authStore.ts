import { create } from 'zustand';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  updateAvatar: (avatar: string) => void;
  logout: () => void;
}

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: DEFAULT_AVATAR,
  },
  updateAvatar: (avatar) => 
    set((state) => ({
      user: state.user ? { ...state.user, avatar } : null,
    })),
  logout: () => set({ user: null }),
}));