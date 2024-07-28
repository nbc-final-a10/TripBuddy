import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    isNaver: boolean;
    setIsNaver: (isNaver: boolean) => void;
}

export const useAuthStore = create<AuthState, [['zustand/persist', AuthState]]>(
    persist(
        set => ({
            isNaver: false,
            setIsNaver: (isNaver: boolean) => set({ isNaver }),
        }),
        {
            name: 'auth-storage', // 로컬 스토리지에 저장될 키
        },
    ),
);
