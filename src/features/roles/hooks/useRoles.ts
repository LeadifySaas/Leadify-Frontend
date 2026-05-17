import { useState, useCallback } from 'react';
import type { MenuPermiso, Perfil } from '../types';
import { rolesService } from '../services/roles.service';
import { useAuthStore } from '@/shared/store/auth.store';
import { mergeMenuConPermisos } from '@/shared/lib/mergeMenuPermisos';

export const useRoles = () => {
    const [perfiles, setPerfiles] = useState<Perfil[]>([]);
    const [permisos, setPermisos] = useState<MenuPermiso[]>([]);
    const [loading, setLoading] = useState(false);
    const { user, updateMenu } = useAuthStore();

    const loadPerfiles = useCallback(async () => {
        setLoading(true);
        try {
            const res = await rolesService.getAll();
            // Asumiendo que la API devuelve los arrays en res.data
            setPerfiles(res.data || []);
        } catch (error) {
            console.error("Error cargando perfiles:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const loadPermisos = useCallback(async (idPerfil: number) => {
        setLoading(true);
        try {
            const res = await rolesService.getPermisos(idPerfil);
            // Mapear los datos del backend a la interfaz del frontend
            const mappedPermisos = (res.data || []).map((modulo: any) => ({
                idMenuesXPerfil: modulo.idMenuesXPerfil || 0,
                idMenu: modulo.idMenu,
                idPerfil: idPerfil,
                nombre: modulo.nombre || '',
                ruta: modulo.ruta || null,
                idPadre: null,
                permisoVer: !!modulo.ver,
                permisoCrear: !!modulo.crear,
                permisoEditar: !!modulo.editar,
                permisoEliminar: !!modulo.eliminar,
                // MAPEAMOS LOS HIJOS
                subPermisos: (modulo.subPermisos || []).map((sub: any) => ({
                    idMenuesXPerfil: sub.idMenuesXPerfil || 0,
                    idMenu: sub.idMenu,
                    idPerfil: idPerfil,
                    nombre: sub.nombre || '',
                    ruta: sub.ruta || null,
                    idPadre: modulo.idMenu,
                    permisoVer: !!sub.ver,
                    permisoCrear: !!sub.crear,
                    permisoEditar: !!sub.editar,
                    permisoEliminar: !!sub.eliminar
                }))
            }));
            setPermisos(mappedPermisos);
        } catch (error) {
            console.error("Error cargando permisos:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleToggle = (idMenu: number, campo: keyof Pick<MenuPermiso, 'permisoVer' | 'permisoCrear' | 'permisoEditar' | 'permisoEliminar'>) => {
        setPermisos(prev => prev.map(modulo => {
            // 1. Si es el padre el que cambió
            if (modulo.idMenu === idMenu) {
                return { ...modulo, [campo]: !modulo[campo] };
            }

            // 2. Si es uno de los hijos
            return {
                ...modulo,
                subPermisos: (modulo.subPermisos || []).map((sub: any) =>
                    sub.idMenu === idMenu ? { ...sub, [campo]: !sub[campo] } : sub
                )
            };
        }));
    };

    const saveChanges = async (idPerfil: number) => {
        setLoading(true);
        try {
            // Formatear payload usando flatMap para enviar Padres e Hijos juntos
            const payload = permisos.flatMap(p => [
                {
                    idMenuesXPerfil: p.idMenuesXPerfil || 0,
                    idMenu: p.idMenu,
                    idPerfil: idPerfil,
                    permisoVer: p.permisoVer,
                    permisoCrear: p.permisoCrear,
                    permisoEditar: p.permisoEditar,
                    permisoEliminar: p.permisoEliminar || false
                },
                ...(p.subPermisos || []).map(sub => ({
                    idMenuesXPerfil: sub.idMenuesXPerfil || 0,
                    idMenu: sub.idMenu,
                    idPerfil: idPerfil,
                    permisoVer: sub.permisoVer,
                    permisoCrear: sub.permisoCrear,
                    permisoEditar: sub.permisoEditar,
                    permisoEliminar: sub.permisoEliminar || false
                }))
            ]);
            await rolesService.updatePermisos(idPerfil, payload as any);

            // Si el perfil que se modificó es el del usuario actual, actualizamos la sesión
            if (user?.RolId && Number(user.RolId) === idPerfil) {
                const [menuRes, permisosRes] = await Promise.all([
                    rolesService.getMenuHierarchy(idPerfil),
                    rolesService.getPermisos(idPerfil),
                ]);
                const merged = mergeMenuConPermisos(menuRes.data, permisosRes.data);
                updateMenu(merged);
            }
        } catch (error) {
            console.error("Error guardando permisos:", error);
        } finally {
            setLoading(false);
        }
    };

    return { perfiles, loadPerfiles, permisos, loadPermisos, setPermisos, handleToggle, saveChanges, loading };
};