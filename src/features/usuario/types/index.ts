export interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    nombreRol: string; 
    activo: boolean;
    telefono?: string;
    fotoPerfil?: string;
    areaSector?: string;
    observaciones?: string;
}

export interface UsuarioDto extends Omit<Usuario, 'id'> {
    password?: string;
    rolId?: number;
}