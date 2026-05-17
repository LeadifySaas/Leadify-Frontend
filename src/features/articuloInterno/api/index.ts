import api from "@/shared/lib/api";
import type { ArticuloInterno, ArticuloInternoDto } from "../types";

export const articuloApi = {
    getAll: async (page = 1, size = 25, search = "") => {
const { data } = await api.get(`/ArticulosInterno?page=${page}&size=${size}&search=${search}`);
        return data;
    },
    getById: async (id: number) => {
        const { data } = await api.get<ArticuloInterno>(`/ArticulosInterno/${id}`);
        return data;
    },
    create: async (articulo: ArticuloInternoDto) => {
        const { data } = await api.post<ArticuloInterno>("/ArticulosInterno", articulo);
        return data;
    },
    update: async (id: number, articulo: ArticuloInternoDto) => {
        const { data } = await api.put(`/ArticulosInterno/${id}`, articulo);
        return data;
    },
    delete: async (id: number) => {
        await api.delete(`/ArticulosInterno/${id}`);
    },
};