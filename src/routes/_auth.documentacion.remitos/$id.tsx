import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/documentacion/remitos/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/documentacion/remitos/$id"!</div>
}
