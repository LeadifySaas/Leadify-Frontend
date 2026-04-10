import { z } from "zod";

export const clienteSchema = z.object({
    razonSocial: z.string().min(3, "La razón social es obligatoria"),
    cuit: z.string().min(11, "CUIT inválido").max(13),
    email: z.string().email("Email inválido"),
    telefono: z.string().optional(),
    condicionIVA: z.string().min(1, "Seleccione una condición"),
    activo: z.boolean(),
});

export type ClienteFormValues = z.infer<typeof clienteSchema>;