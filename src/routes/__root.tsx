import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { useAuthStore } from '@/shared/store/auth.store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MyRouterContext {
  auth: ReturnType<typeof useAuthStore.getState>;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  ),
});