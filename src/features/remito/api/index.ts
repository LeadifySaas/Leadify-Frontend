import axios from 'axios';
import type { Remito } from '../types';

const API_URL = import.meta.env.VITE_API_URL + '/remitos';

export const remitoApi = {
    // Obtener todos para la tabla
    getAll: async () => {
        const { data } = await axios.get<Remito[]>(API_URL);
        return data;
    },

    // Obtener uno para editar
    getById: async (id: number) => {
        const { data } = await axios.get<Remito>(`${API_URL}/${id}`);
        return data;
    },

    // Crear (Aquí es donde el backend descuenta stock)
    create: async (remito: any) => {
        const { data } = await axios.post(API_URL, remito);
        return data;
    },

    // Borrar (Usando el ID que viene de Radix)
    delete: async (id: number) => {
        await axios.delete(`${API_URL}/${id}`);
    }
};