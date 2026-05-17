export interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    nombrePerfil: string;
    activo: boolean;
    telefono?: string | null;
    fotoPerfil?: string | null;
    areaSector?: string | null;
    observaciones?: string | null;
}

export interface UsuarioDto extends Omit<Usuario, 'id' | 'nombrePerfil'> {
    password?: string;
    perfilId: number;
}