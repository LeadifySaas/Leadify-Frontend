import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clienteApi } from "../api";
import type { ClienteDto } from "../types";

export const useClientes = (page?: number, size?: number, search?: string) => {
    const queryClient = useQueryClient();

    const clientesQuery = useQuery({
        queryKey: ["clientes", page, size, search],
        queryFn: () => clienteApi.getAll(page || 1, size || 25, search),
    });

    const useClienteQuery = (id: number) => {
        return useQuery({
            queryKey: ["cliente", id],
            queryFn: () => clienteApi.getById(id),
            enabled: !!id,
        });
    };

    const createMutation = useMutation({
        mutationFn: (nuevo: ClienteDto) => clienteApi.create(nuevo),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clientes"] }),
    });

    const updateMutation = useMutation({
        mutationFn: (data: { id: number } & ClienteDto) => clienteApi.update(data.id, data),
        onSuccess: (updated) => {
            queryClient.invalidateQueries({ queryKey: ["clientes"] });
            queryClient.invalidateQueries({ queryKey: ["cliente", updated.id] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => clienteApi.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clientes"] }),
    });

    return {
        clientesQuery,
        useClienteQuery,
        createCliente: createMutation.mutateAsync,
        isCreating: createMutation.isPending,
        updateCliente: updateMutation.mutateAsync,
        isUpdating: updateMutation.isPending,
        deleteCliente: deleteMutation.mutateAsync
    };
};