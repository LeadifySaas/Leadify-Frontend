/**
 * Combina los datos del endpoint /menu (que tiene icono, ruta, jerarquía)
 * con los datos del endpoint /permisos (que tiene los flags CRUD: ver/crear/editar/eliminar).
 *
 * El resultado es un array de menuItems con TODA la información necesaria:
 *  - Para el Sidebar: nombre, ruta, icono, subMenues
 *  - Para usePermissions: permisoVer, permisoCrear, permisoEditar, permisoEliminar
 */
export function mergeMenuConPermisos(menuData: any[], permisosData: any[]): any[] {
    // Construimos un mapa ruta → permiso para búsqueda O(1)
    // Aplanamos padres e hijos del endpoint /permisos
    const permisosPorRuta = new Map<string, any>();
    permisosData.forEach((modulo: any) => {
        if (modulo.ruta) permisosPorRuta.set(modulo.ruta, modulo);
        (modulo.subPermisos || []).forEach((sub: any) => {
            if (sub.ruta) permisosPorRuta.set(sub.ruta, sub);
        });
    });

    const injectarPermisos = (item: any): any => {
        const p = permisosPorRuta.get(item.ruta) || {};
        return {
            ...item,
            // Soportamos tanto nombres cortos (ver/crear) como largos (permisoVer/permisoCrear)
            permisoVer:      !!(p.ver      ?? p.permisoVer),
            permisoCrear:    !!(p.crear    ?? p.permisoCrear),
            permisoEditar:   !!(p.editar   ?? p.permisoEditar),
            permisoEliminar: !!(p.eliminar ?? p.permisoEliminar),
        };
    };

    return menuData.map((menu: any) => ({
        ...injectarPermisos(menu),
        subMenues: (menu.subMenues || menu.subPermisos || []).map(injectarPermisos),
    }));
}
