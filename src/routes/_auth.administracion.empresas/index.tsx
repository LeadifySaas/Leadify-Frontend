import { createFileRoute } from '@tanstack/react-router'
import EmpresaPage from '@/features/empresa/pages'

export const Route = createFileRoute('/_auth/administracion/empresas/')({
  component: EmpresaPage,
})