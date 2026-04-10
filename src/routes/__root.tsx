import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { useAuthStore } from '@/shared/store/auth.store';

interface MyRouterContext {
  auth: ReturnType<typeof useAuthStore.getState>;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});