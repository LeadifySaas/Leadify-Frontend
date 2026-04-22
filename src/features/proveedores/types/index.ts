export interface ProveedorArchivo {
    id?: number;
    nombreOriginal: string;
    urlRelativa: string;
    extension: string;
    fechaSubida: string;
}

export interface Proveedor {
    id?: number;
    razonSocial: string;
    cuit: string;
    email?: string;
    telefono?: string;
    rubro?: string;
    activo: boolean;
    fechaCreacion: string;
    archivos?: ProveedorArchivo[];
}

export interface ProveedorDto extends Omit<Proveedor, 'id' | 'fechaCreacion' | 'archivos'> { }