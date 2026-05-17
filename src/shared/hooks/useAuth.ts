import { useAuthStore } from '@/shared/store/auth.store';

export const useAuth = () => {
    const { user } = useAuthStore();

    const hasAccess = (modulo: string, accion: 'ver' | 'crear' | 'editar' | 'eliminar') => {
        if (user?.role === 'ADMINISTRADOR') return true;

        const permiso = user?.permisos?.find(p =>
            p.nombre.toLowerCase() === modulo.toLowerCase() ||
            p.ruta?.includes(modulo)
        );

        return permiso ? permiso[accion] === true : false;
    };

    return { hasAccess, user };
};