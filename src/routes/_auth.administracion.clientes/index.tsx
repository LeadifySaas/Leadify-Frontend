import { createFileRoute } from '@tanstack/react-router'
import ClientesList from '@/features/cliente/pages'

export const Route = createFileRoute('/_auth/administracion/clientes/')({
    component: ClientesList,
})