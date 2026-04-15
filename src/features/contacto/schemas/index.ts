import { z } from "zod";

export const contactoSchema = z.object({
    nombre: z.string().min(2, "El nombre es muy corto"),
    apellido: z.string().min(2, "El apellido es muy corto"),
    puesto: z.string().optional().nullable().transform(val => val ?? ""),
    
    // Si la DB exige que sea único, mejor obligarlo aquí para evitar errores 500
    email: z.string()
        .min(1, "El email es obligatorio") 
        .email("Email inválido"),
    
    telefono: z.string().optional().nullable().transform(val => val ?? ""),
    
    clienteId: z.preprocess(
        (val) => (val === "" || val === null ? undefined : Number(val)),
        z.number().optional()
    ),
    empresaId: z.preprocess(
        (val) => (val === "" || val === null ? undefined : Number(val)),
        z.number().optional()
    ),
    
    observaciones: z.string().optional().nullable().transform(val => val ?? ""),
    activo: z.boolean().default(true),
});

export type ContactoFormValues = z.infer<typeof contactoSchema>;