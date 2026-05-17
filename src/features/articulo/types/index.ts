export interface Articulo {
    id: number;
    codigo: string;
    nombre: string;
    descripcion?: string;
    unidadMedida: string;
    precioVenta: number;
    stockActual: number;
    activo: boolean;
    imagenUrl?: string;
}

export interface ArticuloDto extends Omit<Articulo, 'id'> { }