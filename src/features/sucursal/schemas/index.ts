import { z } from "zod";

export const sedeSchema = z.object({
    clienteId: z.number().min(1, "Debe seleccionar un cliente"),
    nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    direccion: z.string().min(1, "La dirección es obligatoria"),
    localidad: z.string().min(1, "La localidad es obligatoria"),
    provincia: z.string().min(1, "La provincia es obligatoria"),
    codigoPostal: z.string().min(1, "El código postal es obligatorio"),
    contactoNombre: z.string().optional(),
    contactoTelefono: z.string().optional(),
    activo: z.boolean().optional(),
});

export type SedeFormValues = z.infer<typeof sedeSchema>;