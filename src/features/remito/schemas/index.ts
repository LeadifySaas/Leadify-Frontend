import { z } from "zod";

// schemas/index.ts
export const remitoItemSchema = z.object({
    articuloId: z.number().min(1, "Seleccione un artículo"),
    cantidad: z.number().min(0.1, "Mínimo 0.1"),
    notas: z.string().optional().nullable(),
});

export const remitoSchema = z.object({
    numeroRemito: z.string().min(1, "El número es obligatorio"),
    fechaEmision: z.string(),
    clienteId: z.number().min(1, "Seleccione cliente"),
    sedeId: z.number().min(1, "Seleccione sede"),
    estado: z.string().optional(),
    observaciones: z.string().optional().nullable(),
    items: z.array(remitoItemSchema).min(1, "Agregue al menos un producto"),
});

export type RemitoFormValues = z.infer<typeof remitoSchema>;