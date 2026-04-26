export interface ArticuloInterno {
    id: number;
    codigo: string;
    nombre: string;
    descripcion?: string;
    unidadMedida: string;
    precioVenta: number;
    precioCompra: number;
    stockActual: number;
    activo: boolean;
}

export interface ArticuloInternoDto extends Omit<ArticuloInterno, 'id'> { }