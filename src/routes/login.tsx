import { createFileRoute, redirect } from '@tanstack/react-router';
import { LoginPage } from '@/features/login/pages/LoginPage';

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    // Si ya hay token, no mostramos el login, mandamos a la Home
    if (context.auth.token) {
      throw redirect({ to: '/' });
    }
  },
  component: LoginPage
});
