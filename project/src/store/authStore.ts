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

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://unsplash.com/photos/woman-sits-of-sofa-while-using-tablet-computer-eZ8g_7Sh0J0?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash',
  },
  updateAvatar: (avatar) => 
    set((state) => ({
      user: state.user ? { ...state.user, avatar } : null,
    })),
  logout: () => set({ user: null }),
}));