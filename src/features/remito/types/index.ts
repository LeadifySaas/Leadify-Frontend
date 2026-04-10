import type { Articulo } from "../../articulo/types";
import type { Cliente } from "../../cliente/types";

export interface RemitoItem {
    id?: number;
    articuloId: number;
    articulo?: Articulo;
    cantidad: number;
    precioUnitario: number;
    notas?: string;
}

export interface Remito {
    id?: number;
    numeroRemito: string;
    clienteId: number;
    cliente?: Cliente;
    sedeId: number;
    fechaEmision: string;
    estado: 'Pendiente' | 'Entregado' | 'En Camino' | 'Cancelado';
    observaciones?: string;
    items: RemitoItem[];
}