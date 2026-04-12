import { createFileRoute } from '@tanstack/react-router';
import { EmpresaForm } from '@/features/empresa/components/EmpresaForm';
import { css } from '../../../styled-system/css';

export const Route = createFileRoute('/_auth/administracion/empresas/nuevo')({
    component: NuevoClientePage,
});

function NuevoClientePage() {
    return (
        <div className={css({ p: '6', maxW: '4xl', mx: 'auto' })}>
            <div className={css({ mb: '6' })}></div>
            <EmpresaForm mode="create" />
        </div>
    );
}