import { createFileRoute } from '@tanstack/react-router'
import { ContactoForm } from '@/features/contacto/components/ContactoForm'
import { useContactos } from '@/features/contacto/hooks/useContacto'
import { css } from '../../../styled-system/css'

export const Route = createFileRoute('/_auth/administracion/contactos/$id')({
  component: EditContactoPage,
})

function EditContactoPage() {
  const { id } = Route.useParams() // Captura el $id de la URL
  const { useContactoQuery } = useContactos()

  // Usamos el hook para buscar los datos de ese ID específico
  const { data: contacto, isLoading, isError } = useContactoQuery(Number(id))

  if (isLoading) return <div className={css({ p: '10', textAlign: 'center' })}>Cargando datos del contacto...</div>
  if (isError) return <div className={css({ p: '10', color: 'red.500' })}>Error al cargar el contacto</div>

  return (
    <div className={css({ p: '6', maxW: '4xl', mx: 'auto' })}>
      {/* Pasamos mode="edit" e initialData con lo que vino de la API */}
      <ContactoForm mode="edit" initialData={contacto} />
    </div>
  )
}