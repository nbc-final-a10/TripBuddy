import create from 'zustand';

interface AuthState {
    isNaver: boolean;
    setIsNaver: (isNaver: boolean) => void;
}

export const useAuthStore = create<AuthState>(set => ({
    isNaver: false,
    setIsNaver: (isNaver: boolean) => set({ isNaver }),
}));
