export interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    nombreRol: string; // El campo que creamos en el DTO de C#
    activo: boolean;
}

export interface UsuarioDto extends Omit<Usuario, 'id'> {
    password?: string;
    rolId?: number;
}