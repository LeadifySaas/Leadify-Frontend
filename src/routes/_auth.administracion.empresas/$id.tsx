import { createFileRoute } from '@tanstack/react-router'
import { EmpresaForm } from '@/features/empresa/components/EmpresaForm'
import { useEmpresas } from '@/features/empresa/hooks/useEmpresas'
import { css } from '@/../styled-system/css';

export const Route = createFileRoute('/_auth/administracion/empresas/$id')({
  component: EditEmpresaPage,
})

function EditEmpresaPage() {
  const { id } = Route.useParams()
  const { useEmpresaQuery } = useEmpresas()

  const { data: empresa, isLoading, isError } = useEmpresaQuery(Number(id))

  if (isLoading) return <div className={css({ p: '10', textAlign: 'center' })}>Cargando datos de la empresa...</div>
  if (isError) return <div className={css({ p: '10', color: 'red.500' })}>Error al cargar la empresa</div>

  return (
    <div className={css({ p: '6', maxW: '6xl', mx: 'auto' })}>
      <EmpresaForm mode="edit" initialData={empresa} />
    </div>
  )
}