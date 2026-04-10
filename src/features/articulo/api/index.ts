import api from "@/shared/lib/api";
import type { Articulo, ArticuloDto } from "../types";

export const articuloApi = {
    getAll: async (page = 1, size = 25, search = "") => {
        const { data } = await api.get(`/articulos?page=${page}&size=${size}&search=${search}`);
        return data;
    },
    getById: async (id: number) => {
        const { data } = await api.get<Articulo>(`/articulos/${id}`);
        return data;
    },
    create: async (articulo: ArticuloDto) => {
        const { data } = await api.post<Articulo>("/articulos", articulo);
        return data;
    },
    update: async (id: number, articulo: ArticuloDto) => {
        const { data } = await api.put(`/articulos/${id}`, articulo);
        return data;
    },
    delete: async (id: number) => {
        await api.delete(`/articulos/${id}`);
    },
};