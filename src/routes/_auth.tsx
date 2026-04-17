import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';
import { Sidebar } from '@/shared/ui/Sidebar';
import { Navbar } from '@/shared/ui/Navbar';
import { css } from '../../styled-system/css';

export const Route = createFileRoute('/_auth')({
  // 1. Mantenemos TU lógica de protección intacta
  beforeLoad: ({ context, location }) => {
    if (!context.auth.token) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      });
    }
  },
  component: () => (
    <div className={css({ display: 'flex', minHeight: '100vh' })}>
      <Sidebar />

      <div
        className={css({
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          bgColor: '#F9FAFB'
        })}
      >
        <Navbar />
        <main className={css({ p: '8', flex: 1 })}>
          <Outlet />
        </main>
      </div>
    </div>
  )
});
