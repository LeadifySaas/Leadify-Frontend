import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

interface UserPayload {
    email: string;
    role: string;
    RolId: string;
    exp: number;
    permisos: any[]; // Lista plana para validación rápida
}

interface AuthState {
    token: string | null;
    user: UserPayload | null;
    menuItems: any[]; // Jerarquía para el Sidebar
    setAuth: (token: string, menu: any[]) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            menuItems: [],
            setAuth: (token, menu) => {
                const decoded = jwtDecode<UserPayload>(token);
                // Inyectamos los permisos planos en el objeto user para los hooks
                // Nota: Los permisos planos los sacamos de la jerarquía o un llamado extra
                set({
                    token,
                    user: { ...decoded, permisos: menu.flatMap((m: any) => [m, ...(m.subMenues || [])]) },
                    menuItems: menu
                });
            },
            logout: () => {
                set({ token: null, user: null, menuItems: [] });
                localStorage.removeItem('auth-storage');
            },
        }),
        { name: 'auth-storage' }
    )
);