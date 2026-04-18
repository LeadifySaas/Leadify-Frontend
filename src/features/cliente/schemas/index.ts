import { z } from "zod";

export const clienteSchema = z.object({
    nombre: z.string().min(2, "El nombre es muy corto"),
    apellido: z.string().min(2, "El apellido es muy corto"),
    dni: z.string().optional(),
    cuil: z.string()
        .min(13, "El CUIL con guiones debe tener 13 caracteres")
        .max(13)
        .regex(/^\d{2}-\d{8}-\d{1}$/, "El formato debe ser 00-00000000-0"),
    email: z.string().email("Email inválido"),
    telefono: z.string().optional(),
    direccion: z.string().optional(),
    localidad: z.string().optional(),
    provincia: z.string().optional(),
    codigoPostal: z.string().nullable().optional().transform(val => val ?? ""),
    fechaNacimiento: z.string().nullable().optional().transform(val => val ?? ""),
    condicionIVA: z.string().min(1, "Seleccioná una condición"),
    limiteCredito: z.preprocess((val) => Number(val), z.number().min(0)),
    observaciones: z.string().optional(),
    activo: z.boolean().default(true),
});

export type ClienteFormValues = z.infer<typeof clienteSchema>;