import { createFileRoute } from '@tanstack/react-router';
import { SedeForm } from '@/features/sucursal/components/SedeForm';

export const Route = createFileRoute('/_auth/administracion/sucursales/nuevo')({
    component: () => <SedeForm mode="create" />,
});