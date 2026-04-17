import api from '@/shared/lib/api';
import type { Remito } from '../types';

export const remitoApi = {
    // Quitamos la 's' para que coincida con el Controller de C#
    getAll: async (page = 1, size = 25, search = "") => {
        const { data } = await api.get(`/remito?page=${page}&size=${size}&search=${search}`);
        return data;
    },

    getById: async (id: number) => {
        const { data } = await api.get<Remito>(`/remito/${id}`);
        return data;
    },

    create: async (remito: any) => {
        const { data } = await api.post('/remito', remito);
        return data;
    },

    update: async ({ id, ...remito }: any) => {
        const { data } = await api.put(`/remito/${id}`, remito);
        return data;
    },


    delete: async (id: number) => {
        await api.delete(`/remito/${id}`);
    },

    updateEstado: async (id: number, nuevoEstado: string) => {
        // En .NET, si recibes un [FromBody] string, axios debe enviar el string entre comillas
        const { data } = await api.patch(`/remito/${id}/estado`, JSON.stringify(nuevoEstado), {
            headers: { 'Content-Type': 'application/json' }
        });
        return data;
    },

    verPdf: async (id: number) => {
        const response = await api.get(`/remito/${id}/pdf`, {
            responseType: 'blob', // Necesario para procesar el stream de C#
        });

        // Creamos la URL del objeto pero con el tipo explícito application/pdf
        const blob = new Blob([response.data], { type: 'application/pdf' });
        return window.URL.createObjectURL(blob);
    },

    exportarExcel: async (search: string) => {
        const response = await api.get(`/remito/exportar/excel?search=${search}`, {
            responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Listado_Remitos.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
};