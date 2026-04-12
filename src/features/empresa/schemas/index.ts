import { z } from "zod";

export const empresaSchema = z.object({
    clienteId: z.preprocess(
        (val) => Number(val), 
        z.number().min(1, "Debes seleccionar un cliente")
    ),
    razonSocial: z.string().min(3, "La razón social debe tener al menos 3 caracteres"),
    cuit: z.string()
        .min(13, "El CUIT con guiones debe tener 13 caracteres")
        .max(13)
        .regex(/^\d{2}-\d{8}-\d{1}$/, "El formato debe ser 00-00000000-0"),
    direccionFiscal: z.string().optional(),
    emailFacturacion: z.string().email("Email inválido").optional().or(z.literal("")),
    condicionIva: z.string().min(1, "Seleccioná una condición de IVA"),
    activo: z.boolean().default(true),
});

export type EmpresaFormValues = z.infer<typeof empresaSchema>;