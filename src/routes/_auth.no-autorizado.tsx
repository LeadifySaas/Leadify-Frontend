import { createFileRoute } from '@tanstack/react-router';
import { ForbiddenPage } from '@/shared/components/errors/ForbiddenPage';

export const Route = createFileRoute('/_auth/no-autorizado')({
    component: ForbiddenPage,
});
