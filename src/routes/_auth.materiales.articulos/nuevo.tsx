import { createFileRoute } from '@tanstack/react-router';
import { ArticuloForm } from '@/features/articulo/components/ArticuloForm';
import { css } from '../../../styled-system/css';

export const Route = createFileRoute('/_auth/materiales/articulos/nuevo')({
    component: NuevoArticuloPage,
});

function NuevoArticuloPage() {
    return (
        <div className={css({ p: '6', maxW: '4xl', mx: 'auto' })}>
            <div className={css({ mb: '6' })}></div>
            <ArticuloForm mode="create" />
        </div>
    );
}