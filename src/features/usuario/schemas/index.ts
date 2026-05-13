import { z } from "zod";

export const UsuarioSchema = z.object({
    nombre: z.string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(50, "El nombre es demasiado largo"),

    apellido: z.string()
        .min(2, "El apellido debe tener al menos 2 caracteres")
        .max(50, "El apellido es demasiado largo"),

    email: z.string()
        .email("Email inválido")
        .min(1, "El email es obligatorio"),

    // Validamos que el rol sea un número (el ID del rol)
    rolId: z.coerce.number().min(1, "Seleccione un rol válido"),
    // Contraseña: mínima de 6 caracteres. 
    // .optional() permite que en la edición no tire error si viene vacío
    password: z.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
        .regex(/[0-9]/, "Debe contener al menos un número"),

    activo: z.boolean().default(true),
    telefono: z.string().optional().nullable(),
    areaSector: z.string().optional().nullable(),
    observaciones: z.string().optional().nullable(),
    fotoPerfil: z.string().optional().nullable(),
});

export type UsuarioFormValues = z.infer<typeof UsuarioSchema>;