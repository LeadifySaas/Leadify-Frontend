import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Sidebar } from '@/shared/ui/Sidebar';
import { Navbar } from '@/shared/ui/Navbar';
import { css } from '../../styled-system/css';
import { useAuthStore } from '@/shared/store/auth.store';
import { rolesService } from '@/features/roles/services/roles.service';
import { mergeMenuConPermisos } from '@/shared/lib/mergeMenuPermisos';

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    // 1. Verificación básica de Token
    if (!context.auth.token) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href }
      });
    }

    const permisos = context.auth.user?.permisos || [];

    if (location.pathname !== '/' && location.pathname !== '/no-autorizado') {
      const tieneAcceso = permisos.some((p: any) => {
        if (!p.ruta) return false;

        if (p.ruta === '/') {
          return location.pathname === '/';
        }

        return location.pathname.startsWith(p.ruta);
      });

      if (!tieneAcceso) {
        throw redirect({ to: '/no-autorizado' });
      }
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  const { user, updateMenu } = useAuthStore();

  useEffect(() => {
    if (user?.RolId) {
      const rolId = Number(user.RolId);
      // Llamamos ambos endpoints en paralelo:
      //  - /menu     → estructura de navegación (icono, jerarquía)
      //  - /permisos → flags CRUD (crear, editar, eliminar, ver)
      Promise.all([
        rolesService.getMenuHierarchy(rolId),
        rolesService.getPermisos(rolId),
      ])
        .then(([menuRes, permisosRes]) => {
          const merged = mergeMenuConPermisos(menuRes.data, permisosRes.data);
          updateMenu(merged);
        })
        .catch(err => console.error('Error refrescando permisos:', err));
    }
  }, [user?.RolId, updateMenu]);

  return (
    <div className={css({ display: 'flex', minH: '100vh', bgColor: 'gray.50' })}>
      <Sidebar />
      <div className={css({ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' })}>
        <Navbar />
        <main className={css({ flex: 1, overflowY: 'auto', p: '6' })}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
