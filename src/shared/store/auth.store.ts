import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

interface UserPayload {
    email: string;
    role: string;
    RolId: string;
    exp: number;
    permisos?: any[];
}

interface AuthState {
    token: string | null;
    user: UserPayload | null;
    menuItems: any[]; // Jerarquía para el Sidebar
    setAuth: (token: string, menu: any[]) => void;
    updateMenu: (menu: any[]) => void;
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
                // Normalizamos para manejar ambas APIs (login envía subMenues, getPermisos envía subPermisos)
                const normalizedMenu = menu.map(m => ({
                    ...m,
                    subMenues: m.subMenues || m.subPermisos || []
                }));
                
                set({
                    token,
                    user: { ...decoded, permisos: normalizedMenu.flatMap(m => [m, ...(m.subMenues || [])]) },
                    menuItems: normalizedMenu
                });
            },
            updateMenu: (menu) => {
                const normalizedMenu = menu.map(m => ({
                    ...m,
                    subMenues: m.subMenues || m.subPermisos || []
                }));

                set((state) => {
                    if (!state.user) return state;
                    return {
                        ...state,
                        user: { ...state.user, permisos: normalizedMenu.flatMap(m => [m, ...(m.subMenues || [])]) },
                        menuItems: normalizedMenu
                    };
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
