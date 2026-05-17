import { createFileRoute } from '@tanstack/react-router';
import PerfilPage from '@/features/perfil/pages/Index';

export const Route = createFileRoute('/_auth/administracion/perfil/')({
  component: PerfilPage
});
