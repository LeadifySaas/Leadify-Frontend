import { createFileRoute } from '@tanstack/react-router';
import { SedeForm } from '@/features/sucursal/components/SedeForm';
import { checkActionPermission } from '@/shared/lib/authUtils';

export const Route = createFileRoute('/_auth/administracion/sucursales/nuevo')({
    beforeLoad: ({ context, location }) => {
        checkActionPermission(context.auth, location.pathname, 'crear');
    },
    component: () => <SedeForm mode="create" />,
});