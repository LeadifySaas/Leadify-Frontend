import api from "@/shared/lib/api";
import type { Empresa, EmpresaDto } from "../types";

export const empresaApi = {
    getAll: async (page = 1, size = 25, search = "") => {
        const { data } = await api.get(`/empresa?page=${page}&size=${size}&search=${search}`);
        return data;
    },
    getById: async (id: number) => {
        const { data } = await api.get<Empresa>(`/empresa/${id}`);
        return data;
    },
    getByClienteId: async (clienteId: number) => {
        const { data } = await api.get<Empresa[]>(`/empresa/cliente/${clienteId}`);
        return data;
    },
    create: async (empresa: EmpresaDto) => {
        const { data } = await api.post<Empresa>("/empresa", empresa);
        return data;
    },
    update: async (id: number, empresa: EmpresaDto) => {
        const { data } = await api.put(`/empresa/${id}`, empresa);
        return data;
    },
    delete: async (id: number) => {
        await api.delete(`/empresa/${id}`);
    },
};