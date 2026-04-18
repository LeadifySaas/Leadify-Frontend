export interface Cliente {
   id?: number;
    nombre: string;
    apellido: string;
    dni?: string;
    cuil: string;
    email: string;
    telefono?: string;
    direccion?: string;
    localidad?: string;
    provincia?: string;
    codigoPostal?: string;
    fechaNacimiento?: string;
    condicionIVA: string;
    limiteCredito: number;
    observaciones?: string;
    activo: boolean;
}

export interface ClienteDto extends Omit<Cliente, 'id'> { }