import { createFileRoute } from '@tanstack/react-router';
import { ClienteForm } from '@/features/cliente/components/ClienteForm';
import { css } from '../../../styled-system/css';

export const Route = createFileRoute('/_auth/administracion/clientes/nuevo')({
    component: NuevoClientePage,
});

function NuevoClientePage() {
    return (
        <div className={css({ p: '6', maxW: '4xl', mx: 'auto' })}>
            <div className={css({ mb: '6' })}></div>
            <ClienteForm mode="create" />
        </div>
    );
}