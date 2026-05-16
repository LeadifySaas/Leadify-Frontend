import { create } from 'zustand';

interface Permiso {
    idMenu: number;
    nombre: string;
    permisoVer: boolean;
    permisoCrear: boolean;
    permisoEditar: boolean;
    idPadre?: number;
}

interface PermissionsState {
    permisosEdicion: Permiso[];
    setPermisosEdicion: (permisos: Permiso[]) => void;
    togglePermiso: (idMenu: number, campo: keyof Permiso) => void;
}

export const usePermissionsStore = create<PermissionsState>((set) => ({
    permisosEdicion: [],
    setPermisosEdicion: (permisos) => set({ permisosEdicion: permisos }),
    togglePermiso: (idMenu, campo) => set((state) => ({
        permisosEdicion: state.permisosEdicion.map((p) =>
            p.idMenu === idMenu ? { ...p, [campo]: !p[campo] } : p
        ),
    })),
}));