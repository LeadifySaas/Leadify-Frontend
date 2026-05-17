import { z } from 'zod';

export const PermisoSchema = z.object({
    idMenu: z.number(),
    nombre: z.string(),
    ver: z.boolean(),
    crear: z.boolean(),
    editar: z.boolean(),
    eliminar: z.boolean(),
});

export const UpdatePermisosSchema = z.array(PermisoSchema);

export type PermisoFormValues = z.infer<typeof PermisoSchema>;