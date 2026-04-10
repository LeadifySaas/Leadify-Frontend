import { z } from "zod";

export const remitoItemSchema = z.object({
    articuloId: z.number().min(1, "Seleccione un artículo"),
    codigo: z.string(),
    nombre: z.string(),
    cantidad: z.number().min(0.01, "La cantidad debe ser mayor a 0"),
    precioUnitario: z.number().min(0),
});

export const remitoSchema = z.object({
    numeroRemito: z.string().min(1, "El número es obligatorio"),
    fecha: z.string(),
    clienteId: z.number().min(1, "Seleccione un cliente"),
    sedeId: z.number().min(1, "Seleccione una sede"),
    observaciones: z.string().optional(),
    items: z.array(remitoItemSchema).min(1, "Debe agregar al menos un artículo"),
});

export type RemitoFormValues = z.infer<typeof remitoSchema>;