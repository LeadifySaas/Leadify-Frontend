import api from '@/shared/lib/api'; // O como tengas configurado tu cliente axios
import type { Perfil, MenuPermiso } from '../types';

export const rolesService = {
    getAll: () => api.get<Perfil[]>('/perfiles'),

    getPermisos: (idPerfil: number) =>
        api.get<MenuPermiso[]>(`/perfiles/${idPerfil}/permisos`),

    getMenuHierarchy: (idPerfil: string | number) =>
        api.get<any>(`/perfiles/${idPerfil}/menu`),

    updatePermisos: (idPerfil: number, permisos: any[]) =>
        api.put(`/perfiles/permisos`, permisos),
};