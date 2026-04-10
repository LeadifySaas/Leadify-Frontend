import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { articuloApi } from "../api";
import type { ArticuloFormValues } from "../schemas";

export const useArticulos = (page?: number, size?: number, search?: string) => {
    const queryClient = useQueryClient();

    const articulosQuery = useQuery({
        queryKey: ["articulos", page, size, search],
        queryFn: () => articuloApi.getAll(page || 1, size || 25, search),
    });

    const useArticuloQuery = (id: number) => {
        return useQuery({
            queryKey: ["articulo", id],
            queryFn: () => articuloApi.getById(id),
            enabled: !!id,
        });
    };

    const createMutation = useMutation({
        mutationFn: (nuevo: ArticuloFormValues) => articuloApi.create(nuevo),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["articulos"] }),
    });

    const updateMutation = useMutation({
        mutationFn: (data: { id: number } & ArticuloFormValues) => articuloApi.update(data.id, data),
        onSuccess: (updated, variables) => {
            queryClient.invalidateQueries({ queryKey: ["articulos"] });
            queryClient.invalidateQueries({ queryKey: ["articulo", variables.id] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => articuloApi.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["articulos"] }),
    });

    return {
        articulosQuery,
        useArticuloQuery,
        createArticulo: createMutation.mutateAsync,
        isCreating: createMutation.isPending,
        updateArticulo: updateMutation.mutateAsync,
        isUpdating: updateMutation.isPending,
        deleteArticulo: deleteMutation.mutateAsync
    };
};