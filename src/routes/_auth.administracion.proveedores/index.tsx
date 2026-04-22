import { createFileRoute } from '@tanstack/react-router'
import ProveedoresPage from '@/features/proveedores/pages'

export const Route = createFileRoute('/_auth/administracion/proveedores/')({
  component: ProveedoresPage,
})