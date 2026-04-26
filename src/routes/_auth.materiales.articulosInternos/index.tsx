import { createFileRoute } from '@tanstack/react-router'
import ArticulosInternoList from '@/features/articuloInterno/pages'

export const Route = createFileRoute('/_auth/materiales/articulosInternos/')({
    component: ArticulosInternoList,
})