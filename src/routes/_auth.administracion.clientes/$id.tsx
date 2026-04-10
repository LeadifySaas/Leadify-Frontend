import { createFileRoute } from '@tanstack/react-router'
import { ClienteForm } from '@/features/cliente/components/ClienteForm'
import { useClientes } from '@/features/cliente/hooks/useClientes'
import { css } from '../../../styled-system/css'

export const Route = createFileRoute('/_auth/administracion/clientes/$id')({
  component: EditClientePage,
})

function EditClientePage() {
  const { id } = Route.useParams() // Captura el $id de la URL
  const { useClienteQuery } = useClientes()

  // Usamos el hook para buscar los datos de ese ID específico
  const { data: cliente, isLoading, isError } = useClienteQuery(Number(id))

  if (isLoading) return <div className={css({ p: '10', textAlign: 'center' })}>Cargando datos del cliente...</div>
  if (isError) return <div className={css({ p: '10', color: 'red.500' })}>Error al cargar el cliente</div>

  return (
    <div className={css({ p: '6', maxW: '4xl', mx: 'auto' })}>
      {/* Pasamos mode="edit" e initialData con lo que vino de la API */}
      <ClienteForm mode="edit" initialData={cliente} />
    </div>
  )
}