import { useState, useEffect } from 'react';
import { rolesService } from '../services/roles.service';
import { useAuthStore } from '@/shared/store/auth.store';
import type { MenuPermiso } from '../types';

export const useMenu = () => {
    const [menuItems, setMenuItems] = useState<MenuPermiso[]>([]);
    const { user } = useAuthStore();

    useEffect(() => {
        if (user?.RolId) {
            rolesService.getPermisos(Number(user.RolId)).then(res => {
                setMenuItems(res.data);
            });
        }
    }, [user]);

    return { menuItems };
};