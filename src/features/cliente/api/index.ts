import api from "@/shared/lib/api";
import type { Cliente, ClienteDto } from "../types";

export const clienteApi = {
    getAll: async (page = 1, size = 25, search = "") => {
        const { data } = await api.get(`/clientes?page=${page}&size=${size}&search=${search}`);
        return data;
    },
    getById: async (id: number) => {
        const { data } = await api.get<Cliente>(`/clientes/${id}`);
        return data;
    },
    create: async (cliente: ClienteDto) => {
        const { data } = await api.post<Cliente>("/clientes", cliente);
        return data;
    },
    update: async (id: number, cliente: ClienteDto) => {
        const { data } = await api.put(`/clientes/${id}`, cliente);
        return data;
    },
    delete: async (id: number) => {
        await api.delete(`/clientes/${id}`);
    },
};