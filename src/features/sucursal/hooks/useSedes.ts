import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from "@/shared/lib/api";
import type { SedeFormValues } from "../schemas";

export function useSedes(page?: number, size?: number, search?: string, id?: number) {
    const queryClient = useQueryClient();

    // 1. Query para el listado (se deshabilita si estamos editando uno solo para ahorrar recursos)
    const sedesQuery = useQuery({
        queryKey: ['sedes', page, size, search],
        queryFn: async () => {
            const { data } = await api.get(`/sedes?page=${page || 1}&size=${size || 25}&search=${search || ""}`);
            return data;
        },
        enabled: !id
    });

    // 2. Query para LA sede específica (la que usa tu página de edición)
    const sedeQuery = useQuery({
        queryKey: ['sede', id],
        queryFn: async () => {
            const { data } = await api.get(`/sedes/${id}`);
            return data;
        },
        enabled: !!id, // Solo se dispara si viene un ID en los parámetros
    });

    const createSede = useMutation({
        mutationFn: (data: SedeFormValues) => api.post('/sedes', data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sedes'] })
    });

    // 3. Mutation para UPDATE (Asegurate que reciba el ID y la data por separado)
    const updateSede = useMutation({
        mutationFn: ({ id, ...data }: SedeFormValues & { id: number }) =>
            api.put(`/sedes/${id}`, data),
        onSuccess: (_, variables) => {
            // Limpiamos la caché de la lista y del objeto individual
            queryClient.invalidateQueries({ queryKey: ['sedes'] });
            queryClient.invalidateQueries({ queryKey: ['sede', variables.id] });
        }
    });

    const deleteSede = useMutation({
        mutationFn: (id: number) => api.delete(`/sedes/${id}`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sedes'] })
    });

    return {
        sedesQuery,
        sedeQuery, // <--- Este es el que usás en EditSedePage
        createSede: createSede.mutateAsync,
        updateSede: updateSede.mutateAsync,
        deleteSede: deleteSede.mutateAsync,
        isCreating: createSede.isPending,
        isUpdating: updateSede.isPending
    };
}