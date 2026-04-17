import api from "@/shared/lib/api";
import type { Sede, SedeDto } from "../types";

export const sedeApi = {
    getAll: async (page = 1, size = 25, search = "") => {
        const { data } = await api.get(`/sedes?page=${page}&size=${size}&search=${search}`);
        return data;
    },
    getById: async (id: number) => {
        const { data } = await api.get<Sede>(`/sedes/${id}`);
        return data;
    },
    create: async (sede: SedeDto) => {
        const { data } = await api.post<Sede>("/sedes", sede);
        return data;
    },
    update: async (id: number, sede: SedeDto) => {
        const { data } = await api.put(`/sedes/${id}`, sede);
        return data;
    },
    delete: async (id: number) => {
        await api.delete(`/sedes/${id}`);
    },
};