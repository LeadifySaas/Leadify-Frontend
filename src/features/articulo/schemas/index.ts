import { z } from "zod";

export const articuloSchema = z.object({
    codigo: z.string().min(1, "El código es obligatorio"),
    nombre: z.string().min(3, "El nombre es obligatorio"),
    descripcion: z.string().optional().or(z.literal('')),
    unidadMedida: z.string().min(1, "La unidad de medida es obligatoria"),
    precioVenta: z.number().min(0, "El precio no puede ser negativo"),
    stockActual: z.number().min(0, "El stock no puede ser negativo"),
    activo: z.boolean(),
    imagen: z.any().optional(),
});

export type ArticuloFormValues = z.infer<typeof articuloSchema>;

// export interface Articulo extends Omit<ArticuloFormValues, 'imagen'> {
//     id: number;
//     imagenUrl?: string; // Para mostrar la foto que viene del server
// }