import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

interface UserPayload {
    email: string;
    role: string;
    RolId: string;
    exp: number;
}

interface AuthState {
    token: string | null;
    user: UserPayload | null;
    setToken: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            setToken: (token) => {
                const decoded = jwtDecode<UserPayload>(token);
                set({ token, user: decoded });
            },
            logout: () => {
                set({ token: null, user: null });
                localStorage.removeItem('auth-storage');
            },
        }),
        { name: 'auth-storage' }
    )
);