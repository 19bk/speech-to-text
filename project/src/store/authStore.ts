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

const DEFAULT_AVATAR = "https://unsplash.com/photos/smiling-woman-wearing-turban-i2hoD-C2RUA?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash";

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