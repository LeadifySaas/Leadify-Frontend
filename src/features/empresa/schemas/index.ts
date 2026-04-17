import { z } from "zod";

export const empresaSchema = z.object({
    clienteId: z.preprocess(
        (val) => Number(val), 
        z.number().min(1, "Debes seleccionar un cliente")
    ),
    razonSocial: z.string().min(3, "La razón social debe tener al menos 3 caracteres"),
   cuit: z.string()
    .min(1, "El CUIT es obligatorio")
    .trim() 
    .transform(val => {
        if (/^\d{11}$/.test(val)) {
            return `${val.substring(0, 2)}-${val.substring(2, 10)}-${val.substring(10)}`;
        }
        return val;
    })
    .refine(val => /^\d{2}-\d{8}-\d{1}$/.test(val), {
        message: "El formato debe ser 00-00000000-0"
    }),
    direccionFiscal: z.string().optional(),
    emailFacturacion: z.string().email("Email inválido").optional().or(z.literal("")),
    condicionIva: z.string().min(1, "Seleccioná una condición de IVA"),
    activo: z.boolean().default(true),
});

export type EmpresaFormValues = z.infer<typeof empresaSchema>;