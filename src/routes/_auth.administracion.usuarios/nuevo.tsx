import { createFileRoute } from '@tanstack/react-router';
import { UsuarioForm } from '@/features/usuario/components/UsuarioForm'; // Importamos TU form
import { css } from '../../../styled-system/css';

export const Route = createFileRoute('/_auth/administracion/usuarios/nuevo')({
    component: NuevoUsuarioPage,
});

function NuevoUsuarioPage() {
    return (
        <div className={css({ p: '6', maxW: '4xl', mx: 'auto' })}>
            <div className={css({ mb: '6' })}></div>
            <UsuarioForm mode="create" />
        </div>
    );
}