// src/routes/_auth/administracion/proveedores/$id.tsx
import { createFileRoute } from '@tanstack/react-router';
import { css } from '@/../styled-system/css';
import { ProveedorForm } from '@/features/proveedores/components/ProveedorForm';
import { useProveedores } from '@/features/proveedores/hooks/useProveedores';

export const Route = createFileRoute('/_auth/administracion/proveedores/$id')({
  component: EditProveedorPage,
});

function EditProveedorPage() {
  const { id } = Route.useParams();
  const proveedorId = Number(id);

  // 1. Obtener solo los datos del proveedor
  const { useProveedorQuery } = useProveedores();
  const { data: proveedor, isLoading: isProveedorLoading, isError: isProveedorError } = useProveedorQuery(proveedorId);

  // Estados de carga / error
  if (isProveedorLoading) return <div className={css({ p: '10' })}>Cargando proveedor...</div>;
  if (isProveedorError || !proveedor) return <div className={css({ p: '10', color: 'red.500' })}>Error cargando el proveedor</div>;

  return (
    <div className={css({ p: '6', maxW: '6xl', mx: 'auto' })}>
      {/* El ProveedorForm ya maneja internamente la lógica de cargar 
         y mostrar la lista de archivos, por eso aquí no necesitamos 
         poner el componente ProveedorArchivosList.
      */}
      <ProveedorForm mode="edit" initialData={proveedor} />
    </div>
  );
}