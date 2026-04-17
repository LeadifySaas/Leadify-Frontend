import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactoApi } from "../api";
import type { ContactoDto } from "../types";

export const useContactos = (page?: number, size?: number, search?: string) => {
    const queryClient = useQueryClient();

    // Query para el listado paginado
    const contactosQuery = useQuery({
        queryKey: ["contactos", page, size, search],
        queryFn: () => contactoApi.getAll(page || 1, size || 25, search),
    });

    // Query para obtener un contacto específico por ID
    const useContactoQuery = (id: number) => {
        return useQuery({
            queryKey: ["contacto", id],
            queryFn: () => contactoApi.getById(id),
            enabled: !!id,
        });
    };

    // Mutación para crear
    const createMutation = useMutation({
        mutationFn: (nuevo: ContactoDto) => contactoApi.create(nuevo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contactos"] });
        },
    });

    // Mutación para editar
    const updateMutation = useMutation({
        mutationFn: (data: { id: number } & ContactoDto) => contactoApi.update(data.id, data),
        onSuccess: (updated: any) => {
            queryClient.invalidateQueries({ queryKey: ["contactos"] });
            // Usamos updated.id si el back lo devuelve, o data.id
            queryClient.invalidateQueries({ queryKey: ["contacto", updated?.id] });
        },
    });

    // Mutación para borrar (con los mismos logs que Clientes para trackear el ID)
    const deleteMutation = useMutation({
        mutationFn: (id: number) => {
            console.log("ID de contacto que llega a la mutation:", id); 
            return contactoApi.delete(id);
        },
        onSuccess: () => {
            console.log("Borrado de contacto exitoso");
            queryClient.invalidateQueries({ queryKey: ["contactos"] });
        },
        onError: (err) => {
            console.log("Error al borrar contacto:", err);
        }
    });

    return {
        contactosQuery,
        useContactoQuery,
        createContacto: createMutation.mutateAsync,
        isCreating: createMutation.isPending,
        updateContacto: updateMutation.mutateAsync,
        isUpdating: updateMutation.isPending,
        deleteContacto: deleteMutation.mutateAsync
    };
};