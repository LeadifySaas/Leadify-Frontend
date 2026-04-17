export interface Contacto {
    id?: number;
    clienteId?: number; // FK opcional
    empresaId?: number; // FK opcional
    nombre: string;
    apellido: string;
    puesto?: string;
    telefono?: string;
    email?: string;
    observaciones?: string;
    activo: boolean;
    fechaCreacion?: string;
}

// Usamos Omit para el DTO, excluyendo el ID y la fecha que maneja el servidor
export interface ContactoDto extends Omit<Contacto, 'id' | 'fechaCreacion'> { }