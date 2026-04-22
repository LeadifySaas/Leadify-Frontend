import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { proveedorApi } from "../api"; 
import type { ProveedorDto } from "../types"; 

export const useProveedores = (page?: number, size?: number, search?: string) => {
    const queryClient = useQueryClient();

    // 1. Listado paginado
    const proveedoresQuery = useQuery({
        queryKey: ["proveedores", page, size, search],
        queryFn: () => proveedorApi.getAll(page || 1, size || 25, search),
    });

    // 2. Obtener uno por ID
    const useProveedorQuery = (id: number) => {
        return useQuery({
            queryKey: ["proveedor", id],
            queryFn: () => proveedorApi.getById(id),
            enabled: !!id,
        });
    };

    // 3. Crear
    const createMutation = useMutation({
        mutationFn: (nuevo: ProveedorDto) => proveedorApi.create(nuevo),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["proveedores"] }),
    });

    // 4. Actualizar
    const updateMutation = useMutation({
        mutationFn: (data: { id: number } & ProveedorDto) => proveedorApi.update(data.id, data),
        onSuccess: (updated) => {
            queryClient.invalidateQueries({ queryKey: ["proveedores"] });
            queryClient.invalidateQueries({ queryKey: ["proveedor", updated.id] });
        },
    });

    // 5. Eliminar (con los logs de depuración)
    const deleteMutation = useMutation({
        mutationFn: (id: number) => {
            console.log("ID que llega a la mutation del proveedor:", id);
            return proveedorApi.delete(id);
        },
        onSuccess: () => {
            console.log("Borrado exitoso del proveedor");
            queryClient.invalidateQueries({ queryKey: ["proveedores"] });
        },
        onError: (err) => {
            console.log("Error al borrar el proveedor:", err);
        }
    });

    return {
        proveedoresQuery,
        useProveedorQuery,
        createProveedor: createMutation.mutateAsync,
        isCreating: createMutation.isPending,
        updateProveedor: updateMutation.mutateAsync,
        isUpdating: updateMutation.isPending,
        deleteProveedor: deleteMutation.mutateAsync
    };
};