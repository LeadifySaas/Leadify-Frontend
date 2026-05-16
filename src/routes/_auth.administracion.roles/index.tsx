import { createFileRoute } from '@tanstack/react-router';
import { RolesPage } from '@/features/roles/pages';

export const Route = createFileRoute('/_auth/administracion/roles/')({
    component: RolesPage,
});
