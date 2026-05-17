export interface MenuPermiso {
    idMenuesXPerfil?: number;
    idMenu: number;
    idPerfil?: number;
    nombre: string;
    ruta: string | null;
    idPadre: number | null;
    permisoVer: boolean;
    permisoCrear: boolean;
    permisoEditar: boolean;
    permisoEliminar?: boolean;
    subPermisos?: MenuPermiso[];
}

export interface Perfil {
    idPerfil: number;
    nombre: string;
    activo: boolean;
}