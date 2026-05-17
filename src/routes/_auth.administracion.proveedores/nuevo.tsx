import { createFileRoute } from '@tanstack/react-router';
import { ProveedorForm } from '@/features/proveedores/components/ProveedorForm';
import { css } from '../../../styled-system/css';

export const Route = createFileRoute('/_auth/administracion/proveedores/nuevo')({
    component: NuevoProveedorPage,
});

function NuevoProveedorPage() {
    return (
        <div className={css({ p: '6', maxW: '4xl', mx: 'auto' })}>
            <div className={css({ mb: '6' })}></div>
            <ProveedorForm mode="create" />
        </div>
    );
}