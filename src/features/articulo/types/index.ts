export interface Articulo {
    id: number;
    codigo: string;
    nombre: string;
    descripcion?: string;
    unidadMedida: string;
    precioVenta: number;
    stockActual: number;
    activo: boolean;
}

export interface ArticuloDto extends Omit<Articulo, 'id'> { }