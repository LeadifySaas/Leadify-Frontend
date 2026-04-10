import { createFileRoute } from '@tanstack/react-router'
import ArticulosList from '@/features/articulo/pages'

export const Route = createFileRoute('/_auth/materiales/articulos/')({
    component: ArticulosList,
})