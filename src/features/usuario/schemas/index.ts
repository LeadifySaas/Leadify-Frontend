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

    perfilId: z.number().min(1, "Seleccione un rol válido"),

    // Contraseña opcional: se valida solo si tiene contenido
    password: z.string()
        .optional()
        .refine(
            (val) => !val || (val.length >= 8 && /[A-Z]/.test(val) && /[0-9]/.test(val)),
            { message: "Debe tener al menos 8 caracteres, una mayúscula y un número" }
        ),

    activo: z.boolean(),
    telefono: z.string().optional().nullable(),
    areaSector: z.string().optional().nullable(),
    observaciones: z.string().optional().nullable(),
    fotoPerfil: z.string().optional().nullable(),
});

export type UsuarioFormValues = z.infer<typeof UsuarioSchema>;

