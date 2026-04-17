import { createFileRoute } from '@tanstack/react-router'
import { UsuarioPage } from '@/features/usuario/pages' // Asegurate que el export sea UsuarioPage

export const Route = createFileRoute('/_auth/administracion/usuarios/')({
    component: UsuarioPage,
})