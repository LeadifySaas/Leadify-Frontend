import { createFileRoute } from '@tanstack/react-router';
import { ArticuloForm } from '@/features/articulo/components/ArticuloForm';
import { useArticulos } from '@/features/articulo/hooks/useArticulos';
import { css } from '../../../styled-system/css';

export const Route = createFileRoute('/_auth/materiales/articulos/$id')({
  component: EditArticuloPage
});

function EditArticuloPage() {
  const { id } = Route.useParams(); // Captura el $id de la URL
  const { useArticuloQuery } = useArticulos();

  // Usamos el hook para buscar los datos de ese ID específico
  const { data: articulo, isLoading, isError } = useArticuloQuery(Number(id));

  if (isLoading)
    return (
      <div className={css({ p: '10', textAlign: 'center' })}>
        Cargando datos del articulo...
      </div>
    );
  if (isError)
    return (
      <div className={css({ p: '10', color: 'red.500' })}>
        Error al cargar el articulo
      </div>
    );

  return (
    <div className={css({ p: '6', maxW: '4xl', mx: 'auto' })}>
      {/* Pasamos mode="edit" e initialData con lo que vino de la API */}
      <ArticuloForm mode="edit" initialData={articulo} />
    </div>
  );
}
