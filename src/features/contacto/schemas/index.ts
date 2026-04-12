import { z } from "zod";

export const contactoSchema = z.object({
    nombre: z.string().min(2, "El nombre es muy corto"),
    apellido: z.string().min(2, "El apellido es muy corto"),
    puesto: z.string().optional().nullable().transform(val => val ?? ""),
    email: z.string()
        .email("Email inválido")
        .nullable()
        .or(z.literal("")), // Permite string vacío si no es obligatorio
    telefono: z.string().optional().nullable().transform(val => val ?? ""),
    
    // IDs de relación: los procesamos a número por si vienen del select como string
    clienteId: z.preprocess(
        (val) => (val === "" ? undefined : Number(val)),
        z.number().optional()
    ),
    empresaId: z.preprocess(
        (val) => (val === "" ? undefined : Number(val)),
        z.number().optional()
    ),
    
    observaciones: z.string().optional().nullable().transform(val => val ?? ""),
    activo: z.boolean().default(true),
});

export type ContactoFormValues = z.infer<typeof contactoSchema>;