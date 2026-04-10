import { createFileRoute } from '@tanstack/react-router'
import RemitosPage from '@/features/remito/pages'

export const Route = createFileRoute('/_auth/documentacion/remitos/')({
    component: RemitosPage,
})