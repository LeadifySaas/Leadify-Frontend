import { createRootRoute, Outlet } from '@tanstack/react-router';
import App from '@/App';

export const Route = createRootRoute({
  component: RootLayout
});

function RootLayout() {
  return (
    <App>
      <Outlet />
    </App>
  );
}
