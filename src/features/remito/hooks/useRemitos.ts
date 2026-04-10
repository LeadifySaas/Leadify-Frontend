import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { remitoApi } from '../api';

export function useRemitos() {
    const queryClient = useQueryClient();

    const remitosQuery = useQuery({
        queryKey: ['remitos'],
        queryFn: remitoApi.getAll
    });

    const createMutation = useMutation({
        mutationFn: remitoApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['remitos'] });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: remitoApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['remitos'] });
        }
    });

    return {
        remitos: remitosQuery.data ?? [],
        isLoading: remitosQuery.isLoading,
        createRemito: createMutation.mutateAsync,
        deleteRemito: deleteMutation.mutateAsync,
        isCreating: createMutation.isPending
    };
}