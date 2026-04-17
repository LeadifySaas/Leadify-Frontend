import { createFileRoute } from '@tanstack/react-router'
import SucursalesPage from '@/features/sucursal/pages/index'

export const Route = createFileRoute('/_auth/administracion/sucursales/')({
    component: SucursalesPage,
})