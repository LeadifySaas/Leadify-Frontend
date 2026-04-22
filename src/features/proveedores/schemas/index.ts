import { z } from "zod";

export const proveedorSchema = z.object({
    razonSocial: z.string().min(2, "La razón social es muy corta"),
    cuit: z.string()
        .regex(/^\d{2}-\d{8}-\d{1}$/, "El formato debe ser 00-00000000-0"),
    email: z.string().email("Email inválido").optional().or(z.literal("")),
    telefono: z.string().optional(),
    rubro: z.string().optional(),
    activo: z.boolean().default(true),
});

export type ProveedorFormValues = z.infer<typeof proveedorSchema>;