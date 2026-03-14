import { LoginPage } from '@/features/login';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login/')({
  component: LoginPage
});
