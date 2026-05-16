import { redirect } from '@tanstack/react-router';

/**
 * Verifica si el usuario tiene un permiso específico para la ruta actual.
 * Esta función está diseñada para ser usada en el beforeLoad de TanStack Router.
 */
export const checkActionPermission = (
    auth: any, 
    pathname: string, 
    action: 'crear' | 'editar' | 'eliminar' | 'ver'
) => {
    const permisos = auth.user?.permisos || [];
    
    // Normalizamos el pathname (quitamos /nuevo o /$id para buscar el permiso del módulo padre)
    // Ej: /administracion/usuarios/nuevo -> /administracion/usuarios
    let modulePath = pathname.replace(/\/nuevo$/, '').replace(/\/[^/]+$/, (match) => {
        // Si el último segmento es un ID (no es 'nuevo' y sigue a algo), lo quitamos
        return match === '/nuevo' ? '' : ''; 
    });

    // Una forma más robusta de encontrar el módulo:
    // Buscamos la ruta más larga que sea prefijo de la actual en la lista de permisos
    const sortedPermisos = [...permisos].sort(
        (a, b) => (b.ruta?.length || 0) - (a.ruta?.length || 0)
    );

    const activePermission = sortedPermisos.find((p: any) => {
        if (!p.ruta) return false;
        const rutaNormalizada = p.ruta.replace(/\/$/, '') || '/';
        if (rutaNormalizada === '/') return pathname === '/';
        return pathname.startsWith(rutaNormalizada);
    });

    if (!activePermission) {
        throw redirect({ to: '/no-autorizado' });
    }

    const resolveFlag = (largo: boolean | undefined, corto: boolean | undefined): boolean =>
        largo !== undefined ? !!largo : !!corto;

    let hasPermission = false;
    switch (action) {
        case 'ver':
            hasPermission = resolveFlag(activePermission.permisoVer, activePermission.ver);
            break;
        case 'crear':
            hasPermission = resolveFlag(activePermission.permisoCrear, activePermission.crear);
            break;
        case 'editar':
            hasPermission = resolveFlag(activePermission.permisoEditar, activePermission.editar);
            break;
        case 'eliminar':
            hasPermission = resolveFlag(activePermission.permisoEliminar, activePermission.eliminar);
            break;
    }

    if (!hasPermission) {
        throw redirect({ to: '/no-autorizado' });
    }
};
