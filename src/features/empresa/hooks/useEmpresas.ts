import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { empresaApi } from "../api";
import type { EmpresaDto } from "../types";

export const useEmpresas = (page?: number, size?: number, search?: string) => {
    const queryClient = useQueryClient();

    // Query para el listado paginado
    const empresasQuery = useQuery({
        queryKey: ["empresas", page, size, search],
        queryFn: () => empresaApi.getAll(page || 1, size || 25, search),
    });

    // Query para una empresa individual
    const useEmpresaQuery = (id: number) => {
        return useQuery({
            queryKey: ["empresa", id],
            queryFn: () => empresaApi.getById(id),
            enabled: !!id,
        });
    };

    // Mutation para crear
    const createMutation = useMutation({
        mutationFn: (nuevo: EmpresaDto) => empresaApi.create(nuevo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["empresas"] });
        },
    });

    // Mutation para actualizar
    const updateMutation = useMutation({
        mutationFn: (data: { id: number } & EmpresaDto) => empresaApi.update(data.id, data),
        onSuccess: (updated) => {
            queryClient.invalidateQueries({ queryKey: ["empresas"] });
            queryClient.invalidateQueries({ queryKey: ["empresa", updated?.id] });
        },
    });

    // Mutation para borrar (con los logs que tenías en Clientes)
    const deleteMutation = useMutation({
        mutationFn: (id: number) => {
            console.log("ID de empresa a borrar:", id);
            return empresaApi.delete(id);
        },
        onSuccess: () => {
            console.log("Borrado de empresa exitoso");
            queryClient.invalidateQueries({ queryKey: ["empresas"] });
        },
        onError: (err) => {
            console.log("Error al borrar empresa:", err);
        }
    });

    return {
        empresasQuery,
        useEmpresaQuery,
        createEmpresa: createMutation.mutateAsync,
        isCreating: createMutation.isPending,
        updateEmpresa: updateMutation.mutateAsync,
        isUpdating: updateMutation.isPending,
        deleteEmpresa: deleteMutation.mutateAsync
    };
};