import api from "@/shared/lib/api";
import type { Contacto, ContactoDto } from "../types";

export const contactoApi = {
    getAll: async (page = 1, size = 25, search = "") => {
        // Mantenemos la estructura de query params que espera el Controller de .NET
        const { data } = await api.get(`/contactos?page=${page}&size=${size}&search=${search}`);
        return data;
    },
    
    getById: async (id: number) => {
        const { data } = await api.get<Contacto>(`/contactos/${id}`);
        return data;
    },
    
    create: async (contacto: ContactoDto) => {
        const { data } = await api.post<Contacto>("/contactos", contacto);
        return data;
    },
    
    update: async (id: number, contacto: ContactoDto) => {
        const { data } = await api.put(`/contactos/${id}`, contacto);
        return data;
    },
    
    delete: async (id: number) => {
        // Al igual que en Clientes/Empresas, esto dispara el borrado lógico en el Repo
        await api.delete(`/contactos/${id}`);
    },
};