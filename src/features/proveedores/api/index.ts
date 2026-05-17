import api from "@/shared/lib/api";
import type { Proveedor, ProveedorDto } from "../types";

export const proveedorApi = {
    getAll: async (page = 1, size = 25, search = "") => {
        const { data } = await api.get(`/proveedores?page=${page}&size=${size}&search=${search}`);
        return data;
    },
    getById: async (id: number) => {
        const { data } = await api.get<Proveedor>(`/proveedores/${id}`);
        return data;
    },
    create: async (proveedor: ProveedorDto) => {
        const { data } = await api.post<Proveedor>("/proveedores", proveedor);
        return data;
    },
    update: async (id: number, proveedor: ProveedorDto) => {
        const { data } = await api.put(`/proveedores/${id}`, proveedor);
        return data;
    },
    delete: async (id: number) => {
        await api.delete(`/proveedores/${id}`);
    },
    // Método adicional sugerido para subir archivos
    uploadArchivo: async (id: number, formData: FormData) => {
        const { data } = await api.post(`/proveedores/${id}/archivo`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return data;
    }
};