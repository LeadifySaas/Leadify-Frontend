import { createFileRoute } from '@tanstack/react-router';
import ProfilePage from '@/features/perfil/pages/Index';
import ConfiguracionPage from '@/features/configuracion/pages';

export const Route = createFileRoute('/_auth/administracion/configuracion/')({
  component: ConfiguracionPage
});
