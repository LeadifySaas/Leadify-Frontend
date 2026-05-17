import { createFileRoute } from '@tanstack/react-router';
import { ArticuloInternoForm } from '@/features/articuloInterno/components/ArticuloInternoForm';
import { css } from '../../../styled-system/css';

export const Route = createFileRoute('/_auth/materiales/articulosInternos/nuevo')({
    component: NuevoArticuloInternoPage,
});

function NuevoArticuloInternoPage() {
    return (
        <div className={css({ p: '6', maxW: '4xl', mx: 'auto' })}>
            <div className={css({ mb: '6' })}></div>
            <ArticuloInternoForm mode="create" />
        </div>
    );
}