import { createFileRoute } from '@tanstack/react-router'
import { SedeForm } from '@/features/sucursal/components/SedeForm'
import { useSedes } from '@/features/sucursal/hooks/useSedes'
import { css } from '../../../styled-system/css'
import { checkActionPermission } from '@/shared/lib/authUtils'

export const Route = createFileRoute('/_auth/administracion/sucursales/$id')({
  beforeLoad: ({ context, location }) => {
    checkActionPermission(context.auth, location.pathname, 'editar')
  },
  component: EditSedePage,
})

function EditSedePage() {
  const { id } = Route.useParams() // Captura el $id de la URL
  const { sedeQuery } = useSedes(1, 25, "", Number(id))

  // Buscamos los datos de ese ID específico
  const { data: sede, isLoading, isError } = sedeQuery

  if (isLoading) return <div className={css({ p: '10', textAlign: 'center' })}>Cargando datos de la sucursal...</div>
  if (isError) return <div className={css({ p: '10', color: 'red.500' })}>Error al cargar la sucursal</div>

  return (
    <div className={css({ p: '6', maxW: '4xl', mx: 'auto' })}>
      {/* Pasamos mode="edit" e initialData */}
      <SedeForm mode="edit" initialData={sede} />
    </div>
  )
}
