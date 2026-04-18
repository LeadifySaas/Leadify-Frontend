import { createFileRoute } from '@tanstack/react-router'
import  ContactosList  from '@/features/contacto/pages'

export const Route = createFileRoute('/_auth/administracion/contactos/')({
  component: ContactosList,
})

