import { createFileRoute } from '@tanstack/react-router';
import HomePage from '@/features/home';
import PerfilPage from '@/features/perfil/pages/Index';
import ConfiguracionPage from '@/features/configuracion/pages';

export const Route = createFileRoute('/_auth/')({
  component: HomePage
});
