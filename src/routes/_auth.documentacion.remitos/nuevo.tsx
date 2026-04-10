import { createFileRoute } from '@tanstack/react-router';
import { RemitoForm } from '@/features/remito/components/RemitoForm';

export const Route = createFileRoute('/_auth/documentacion/remitos/nuevo')({
    component: () => <RemitoForm mode="create" />,
});