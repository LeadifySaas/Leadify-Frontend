// src/features/proveedor/hooks/useArchivos.ts
import { useQuery } from '@tanstack/react-query';
import api from "@/shared/lib/api";

export const useArchivos = (proveedorId: number) => {
    return useQuery({
        queryKey: ['archivos', proveedorId],
        queryFn: async () => {
            const { data } = await api.get(`/proveedores/${proveedorId}/archivos`);
            return data;
        },
        enabled: !!proveedorId,
    });
};