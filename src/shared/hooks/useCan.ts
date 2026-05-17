import { useAuthStore } from '@/features/login/stores/authStore';

export const useCan = () => {
    const { user } = useAuthStore();

    const can = (ruta: string, accion: 'permisoVer' | 'permisoCrear' | 'permisoEditar') => {
        if (!user?.permisos) return false;

        // Buscamos por la ruta exacta que viene de la DB
        const permiso = user.permisos.find(p => p.ruta === ruta);

        // Importante: Usar los nombres de propiedad exactos de tu DTO de C#
        return permiso ? permiso[accion] === true : false;
    };

    return { can };
};