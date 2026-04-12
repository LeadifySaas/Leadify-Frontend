import { createFileRoute } from '@tanstack/react-router'
import { ContactoForm } from '@/features/contacto/components/ContactoForm'
import { css } from '../../../styled-system/css'

export const Route = createFileRoute('/_auth/administracion/contactos/nuevo')({
  component: NuevoContactoPage,
})

function NuevoContactoPage() {
    return (
        <div className={css({ p: '6', maxW: '4xl', mx: 'auto' })}>
            <div className={css({ mb: '6' })}></div>
            <ContactoForm mode="create" />
        </div>
    );
}