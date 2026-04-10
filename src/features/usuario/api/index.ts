import api from "@/shared/lib/api";
import type { Usuario, UsuarioDto } from "../types";

export const UsuarioApi = {
    getAll: async (page = 1, size = 25, search = "") => {
        const { data } = await api.get(`/Users?page=${page}&size=${size}&search=${search}`);
        return data;
    },
    getById: async (id: number) => {
        const { data } = await api.get<Usuario>(`/Users/${id}`);
        return data;
    },
    create: async (Usuario: UsuarioDto) => {
        const { data } = await api.post<Usuario>("/Users/register", Usuario);
        return data;
    },
    update: async (id: number, Usuario: UsuarioDto) => {
        const { data } = await api.put(`/Users/${id}`, Usuario);
        return data;
    },
    delete: async (id: number) => {
        await api.delete(`/Users/${id}`);
    },
};