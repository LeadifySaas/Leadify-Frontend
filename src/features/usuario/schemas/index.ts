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
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .optional()
        .or(z.literal("")), 

    activo: z.boolean().default(true),
});

export type UsuarioFormValues = z.infer<typeof UsuarioSchema>;