import { createFileRoute } from '@tanstack/react-router'
import { UsuarioForm } from '@/features/usuario/components/UsuarioForm'
import { useUsuarios } from '@/features/usuario/hooks/useUsuario' // Tu hook de usuarios
import { css } from '../../../styled-system/css'
import { checkActionPermission } from '@/shared/lib/authUtils'

export const Route = createFileRoute('/_auth/administracion/usuarios/$id')({
  beforeLoad: ({ context, location }) => {
    checkActionPermission(context.auth, location.pathname, 'editar')
  },
  component: EditUsuarioPage,
})

function EditUsuarioPage() {
  const { id } = Route.useParams() 
  const { useUsuarioQuery } = useUsuarios()

  const { data: usuario, isLoading, isError } = useUsuarioQuery(Number(id))

  if (isLoading) return <div className={css({ p: '10', textAlign: 'center' })}>Cargando datos del usuario...</div>
  if (isError) return <div className={css({ p: '10', color: 'red.500' })}>Error al cargar el usuario</div>

  return (
    <div className={css({ p: '6', maxW: '4xl', mx: 'auto' })}>
      <UsuarioForm mode="edit" initialData={usuario} />
    </div>
  )
}