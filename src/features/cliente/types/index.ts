export interface Cliente {
    id: number;
    razonSocial: string;
    cuit: string;
    email: string;
    telefono?: string;
    condicionIVA: string;
    activo: boolean;
}

export interface ClienteDto extends Omit<Cliente, 'id'> { }