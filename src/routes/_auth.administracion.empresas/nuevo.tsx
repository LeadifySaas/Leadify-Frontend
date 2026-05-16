import { createFileRoute } from '@tanstack/react-router';
import { ProveedorForm } from '@/features/proveedores/components/ProveedorForm';

import { css } from '../../../styled-system/css';
import { checkActionPermission } from '@/shared/lib/authUtils';

export const Route = createFileRoute('/_auth/administracion/empresas/nuevo')({
    beforeLoad: ({ context, location }) => {
        checkActionPermission(context.auth, location.pathname, 'crear');
    },
    component: NuevoEmpresaPage,
});

function NuevoEmpresaPage() {
    return (
        <div className={css({ p: '6', maxW: '4xl', mx: 'auto' })}>
            <div className={css({ mb: '6' })}></div>
            <ProveedorForm mode="create" />
        </div>
    );
}