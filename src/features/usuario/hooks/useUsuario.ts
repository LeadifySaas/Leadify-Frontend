import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UsuarioApi } from "../api";
import type { UsuarioDto } from "../types";

export const useUsuarios = (page?: number, size?: number, search?: string) => {
    const queryClient = useQueryClient();

    const UsuariosQuery = useQuery({
        queryKey: ["Usuarios", page, size, search],
        queryFn: () => UsuarioApi.getAll(page || 1, size || 25, search),
    });

    const useUsuarioQuery = (id: number) => {
        return useQuery({
            queryKey: ["Usuario", id],
            queryFn: () => UsuarioApi.getById(id),
            enabled: !!id,
        });
    };

    const createMutation = useMutation({
        mutationFn: (nuevo: UsuarioDto) => UsuarioApi.create(nuevo),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["Usuarios"] }),
    });

    const updateMutation = useMutation({
        mutationFn: (data: { id: number } & UsuarioDto) => UsuarioApi.update(data.id, data),
        onSuccess: (updated) => {
            queryClient.invalidateQueries({ queryKey: ["Usuarios"] });
            queryClient.invalidateQueries({ queryKey: ["Usuario", updated.id] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => UsuarioApi.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["Usuarios"] }),
    });

    return {
        UsuariosQuery,
        useUsuarioQuery,
        createUsuario: createMutation.mutateAsync,
        isCreating: createMutation.isPending,
        updateUsuario: updateMutation.mutateAsync,
        isUpdating: updateMutation.isPending,
        deleteUsuario: deleteMutation.mutateAsync
    };
};