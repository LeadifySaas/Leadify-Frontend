export interface Empresa {
    id?: number;
    clienteId: number;
    razonSocial: string;
    cuit: string;
    direccionFiscal?: string;
    emailFacturacion?: string;
    condicionIva?: string;
    activo: boolean;
    fechaCreacion?: string;
}

export interface EmpresaDto extends Omit<Empresa, 'id' | 'fechaCreacion'> { }