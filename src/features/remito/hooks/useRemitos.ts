import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { remitoApi } from '../api';

export function useRemitos(page = 1, size = 25, search = "") {
    const queryClient = useQueryClient();

    // 1. Query para obtener la lista
    const { data, isLoading } = useQuery({
        queryKey: ['remitos', page, size, search],
        queryFn: () => remitoApi.getAll(page, size, search)
    });

    // 2. Mutación para Crear
    const createMutation = useMutation({
        mutationFn: remitoApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['remitos'] });
            queryClient.invalidateQueries({ queryKey: ['articulos'] });
        }
    });

    // 3. Mutación para Update completo
    const updateMutation = useMutation({
        mutationFn: remitoApi.update,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['remitos'] });
            queryClient.invalidateQueries({ queryKey: ['articulos'] });
            if (variables.id) {
                queryClient.invalidateQueries({ queryKey: ['remito', variables.id] });
            }
        }
    });

    // 4. NUEVA: Mutación para cambio parcial de Estado
    const updateStatusMutation = useMutation({
        // Desestructuramos para pasar los parámetros correctamente a la API
        mutationFn: ({ id, nuevoEstado }: { id: number; nuevoEstado: string }) =>
            remitoApi.updateEstado(id, nuevoEstado),
        onSuccess: (_, variables) => {
            // Refrescamos la lista de remitos para que cambie el badge en la tabla
            queryClient.invalidateQueries({ queryKey: ['remitos'] });
            // También invalidamos el remito individual por si estamos en la vista detalle
            queryClient.invalidateQueries({ queryKey: ['remito', variables.id] });
        }
    });

    // 5. Mutación para Anular/Eliminar
    const deleteMutation = useMutation({
        mutationFn: remitoApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['remitos'] });
            queryClient.invalidateQueries({ queryKey: ['articulos'] });
        }
    });

    return {
        // Datos
        remitos: data?.items ?? [],
        totalCount: data?.totalCount ?? 0,
        isLoading,

        // Acciones (MutateAsync permite usar try/catch en el componente)
        createRemito: createMutation.mutateAsync,
        updateRemito: updateMutation.mutateAsync,
        updateStatus: updateStatusMutation.mutateAsync, // <-- Agregado
        deleteRemito: deleteMutation.mutateAsync,

        // Estados de carga
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isUpdatingStatus: updateStatusMutation.isPending, // <-- Agregado

        // Errores
        error: createMutation.error || updateMutation.error || updateStatusMutation.error
    };
}