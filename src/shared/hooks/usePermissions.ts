import { useLocation } from '@tanstack/react-router';
import { useAuthStore } from '@/shared/store/auth.store';

export const usePermissions = () => {
    const location = useLocation();
    const { user } = useAuthStore();

    const permisos = user?.permisos || [];

    // Normalizamos el pathname actual quitando la barra final para comparar de forma consistente
    // Ej: '/administracion/usuarios/' → '/administracion/usuarios'
    const currentPath = location.pathname.replace(/\/$/, '') || '/';

    // Buscar el permiso que mejor coincida con la ruta actual.
    // Ordenamos por longitud de ruta descendente para que coincida primero la más específica
    // (ej: /administracion/usuarios antes que /administracion)
    const sortedPermisos = [...permisos].sort(
        (a, b) => (b.ruta?.length || 0) - (a.ruta?.length || 0)
    );

    const activePermission = sortedPermisos.find((p: any) => {
        if (!p.ruta) return false;
        const rutaNormalizada = p.ruta.replace(/\/$/, '') || '/';
        if (rutaNormalizada === '/') return currentPath === '/';
        return currentPath.startsWith(rutaNormalizada);
    });

    // La API puede devolver dos formatos de nombre de campo:
    //   Endpoint /menu:     { ver, crear, editar, eliminar }      → nombres CORTOS
    //   Endpoint /permisos: { permisoVer, permisoCrear, ... }     → nombres LARGOS
    // mergeMenuConPermisos ya inyecta los nombres largos, pero leemos ambos por seguridad.
    const resolveFlag = (largo: boolean | undefined, corto: boolean | undefined): boolean =>
        largo !== undefined ? !!largo : !!corto;

    return {
        canView:   resolveFlag(activePermission?.permisoVer,      activePermission?.ver),
        canCreate: resolveFlag(activePermission?.permisoCrear,    activePermission?.crear),
        canEdit:   resolveFlag(activePermission?.permisoEditar,   activePermission?.editar),
        canDelete: resolveFlag(activePermission?.permisoEliminar, activePermission?.eliminar),
    };
};
