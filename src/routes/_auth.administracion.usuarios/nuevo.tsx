import { createFileRoute } from '@tanstack/react-router';
import { UsuarioForm } from '@/features/usuario/components/UsuarioForm'; // Importamos TU form
import { css } from '../../../styled-system/css';
import { checkActionPermission } from '@/shared/lib/authUtils';

export const Route = createFileRoute('/_auth/administracion/usuarios/nuevo')({
    beforeLoad: ({ context, location }) => {
        checkActionPermission(context.auth, location.pathname, 'crear');
    },
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