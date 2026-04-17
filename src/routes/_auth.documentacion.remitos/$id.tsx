import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { remitoApi } from '@/features/remito/api'
import { RemitoForm } from '@/features/remito/components/RemitoForm'
import { center } from '../../../styled-system/patterns'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/_auth/documentacion/remitos/$id')({
  component: EditRemitoPage,
})

function EditRemitoPage() {
  const { id } = Route.useParams()
  const remitoId = parseInt(id)

  const { data: remito, isLoading, isError } = useQuery({
    queryKey: ['remito', remitoId],
    queryFn: () => remitoApi.getById(remitoId),
    enabled: !!remitoId
  })

  if (isLoading) {
    return (
      <div className={center({ h: '60vh', w: 'full' })}>
        <Loader2 className="animate-spin" size={40} color="#2563eb" />
      </div>
    )
  }

  if (isError || !remito) return <div>Error al cargar el remito.</div>

  // Mapeo de datos para que coincidan con el esquema del form
  const formattedData = {
    ...remito,
    fechaEmision: remito.fechaEmision?.split('T')[0], // Formato YYYY-MM-DD para input date
    items: remito.items.map((i: any) => ({
      articuloId: i.articuloId,
      cantidad: i.cantidad,
      notas: i.notas || ""
    }))
  }

  return <RemitoForm mode="edit" initialData={formattedData} />
}