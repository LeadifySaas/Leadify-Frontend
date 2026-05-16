import { useState } from 'react';
import { css } from '../../../../styled-system/css';
import { stack, hstack, center } from '../../../../styled-system/patterns';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Package,
  ChevronLeft,
  ChevronRight,
  BadgeDollarSign
} from 'lucide-react';
import { useArticulos } from '../hooks/useArticulos';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { usePermissions } from '@/shared/hooks/usePermissions';
import { useNavigate } from '@tanstack/react-router';

export default function ArticuloPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const size = 25;

  const { canCreate, canEdit, canDelete } = usePermissions();

  const { articulosQuery, deleteArticulo } = useArticulos(page, size, search);
  const { data, isLoading } = articulosQuery;

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
      await deleteArticulo(id);
    }
  };

  return (
    <div className={stack({ gap: '6', p: '6' })}>
      {/* Header con Título y Botón Nuevo */}
      <div className={hstack({ justifyContent: 'space-between' })}>
        <div className={hstack({ gap: '3' })}>
          <div
            className={center({
              p: '2.5',
              bgColor: 'blue.50',
              color: 'blue.600',
              borderRadius: 'xl'
            })}
          >
            <Package size={24} />
          </div>
          <div>
            <h1
              className={css({
                fontSize: '2xl',
                fontWeight: '800',
                color: '#1A365D'
              })}
            >
              Artículos
            </h1>
            <p className={css({ fontSize: 'sm', color: 'gray.500' })}>
              Gestioná tu inventario, precios y stock
            </p>
          </div>
        </div>

        {canCreate && (
          <button
            onClick={() => navigate({ to: '/materiales/articulos/nuevo' })}
            className={hstack({
              px: '5',
              py: '2.5',
              bgColor: 'blue.600',
              color: 'white',
              borderRadius: 'xl',
              fontWeight: 'bold',
              cursor: 'pointer',
              _hover: { bgColor: 'blue.700' },
              transition: 'all 0.2s'
            })}
          >
            <Plus size={18} /> Nuevo Artículo
          </button>
        )}
      </div>

      {/* Barra de Búsqueda */}
      <div className={hstack({ gap: '4', w: 'full', maxW: 'md' })}>
        <div className={css({ position: 'relative', flex: 1 })}>
          <Search
            className={css({
              position: 'absolute',
              left: '3',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'gray.400'
            })}
            size={18}
          />
          <input
            placeholder="Buscar por nombre o código..."
            className={inputStyle}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Tabla Estilizada */}
      <div className={cardStyle}>
        <table
          className={css({
            w: 'full',
            borderCollapse: 'collapse',
            borderRadius: '2xl'
          })}
        >
          <thead>
            <tr
              className={css({
                borderBottom: '1px solid',
                borderBottomColor: 'gray.200',
                textAlign: 'left'
              })}
            >
              <th className={css(thStyle)}>Código</th>
              <th className={css(thStyle)}>Nombre / Descripción</th>
              <th className={css(thStyle)}>Precio Venta</th>
              <th className={css(thStyle)}>Stock</th>
              <th className={css(thStyle)}>Estado</th>
              {(canEdit || canDelete) && (
                <th className={css({ ...thStyle, textAlign: 'center' })}>
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className={tdStyle}>
                  Cargando artículos...
                </td>
              </tr>
            ) : (
              data?.items?.map((articulo: any) => (
                <tr
                  key={articulo.id}
                  className={css({
                    borderBottom: '1px solid',
                    borderBottomColor: 'gray.200',
                    _hover: { bgColor: 'gray.50/50' },
                    transition: 'colors 0.2s',
                    _last: {
                      borderBottom: 'none'
                    }
                  })}
                >
                  <td className={tdStyle}>
                    <code
                      className={css({
                        fontSize: 'xs',
                        bgColor: 'blue.50',
                        color: 'blue.700',
                        px: '2',
                        py: '1',
                        borderRadius: 'md',
                        fontWeight: 'bold'
                      })}
                    >
                      {articulo.codigo}
                    </code>
                  </td>
                  <td className={tdStyle}>
                    <div className={stack({ gap: '0' })}>
                      <span
                        className={css({
                          fontWeight: '700',
                          color: 'gray.800'
                        })}
                      >
                        {articulo.nombre}
                      </span>
                      <span
                        className={css({ fontSize: 'xs', color: 'gray.400' })}
                      >
                        {articulo.descripcion || 'Sin descripción'}
                      </span>
                    </div>
                  </td>
                  <td className={tdStyle}>
                    <span
                      className={css({ fontWeight: '600', color: 'green.600' })}
                    >
                      $ {articulo.precioVenta.toLocaleString('es-AR')}
                    </span>
                  </td>
                  <td className={tdStyle}>
                    <span
                      className={css({
                        fontWeight: 'bold',
                        color:
                          articulo.stockActual <= 0 ? 'red.500' : 'gray.700'
                      })}
                    >
                      {articulo.stockActual}{' '}
                      <small
                        className={css({
                          fontWeight: 'normal',
                          color: 'gray.400'
                        })}
                      >
                        {articulo.unidadMedida}
                      </small>
                    </span>
                  </td>
                  <td className={tdStyle}>
                    <span
                      className={css({
                        padding: '4px 8px',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        backgroundColor: articulo.activo
                          ? 'state.success'
                          : 'state.error'
                      })}
                    >
                      {articulo.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  {(canEdit || canDelete) && (
                    <td className={`${tdStyle} ${css({ textAlign: 'center' })}`}>
                      <div
                        className={hstack({
                          gap: '1',
                          justifyContent: 'center'
                        })}
                      >
                        {canEdit && (
                          <button
                            className={actionBtnStyle}
                            title="Editar"
                            onClick={() =>
                              navigate({
                                to: '/materiales/articulos/$id',
                                params: { id: articulo.id.toString() }
                              })
                            }
                          >
                            <Edit size={16} />
                          </button>
                        )}
                        {canDelete && (
                          <ConfirmDialog
                            title="¿Eliminar artículo?"
                            description={`Estás por borrar "${articulo.nombre}". Esta acción no se puede deshacer.`}
                            onConfirm={() => deleteArticulo(articulo.id)}
                            confirmText="Sí, eliminar"
                            trigger={
                              <button
                                className={css({
                                  color: 'red.500',
                                  cursor: 'pointer',
                                  p: '2'
                                })}
                              >
                                <Trash2 size={18} />
                              </button>
                            }
                          />
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer con Paginación */}
      <div className={hstack({ justifyContent: 'space-between', px: '2' })}>
        <p
          className={css({
            fontSize: 'sm',
            color: 'gray.500',
            fontWeight: '500'
          })}
        >
          Mostrando{' '}
          <span className={css({ color: 'blue.600', fontWeight: 'bold' })}>
            {data?.items?.length || 0}
          </span>{' '}
          de {data?.totalCount || 0} artículos
        </p>

        <div className={hstack({ gap: '2' })}>
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className={paginationBtnStyle}
          >
            <ChevronLeft size={18} />
          </button>
          <div
            className={center({
              px: '4',
              h: '40px',
              borderRadius: 'xl',
              border: '1px solid',
              borderColor: 'gray.200',
              fontSize: 'sm',
              fontWeight: 'bold'
            })}
          >
            {page}
          </div>
          <button
            disabled={data?.items?.length < size}
            onClick={() => setPage((p) => p + 1)}
            className={paginationBtnStyle}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Estilos Consistentes (Se mantienen igual para coherencia visual) ---
const cardStyle = css({
  bgColor: 'white',
  borderRadius: '2xl',
  border: '1px solid',
  borderColor: 'gray.200',
  overflow: 'hidden'
});
const thStyle = {
  px: '6',
  py: '4',
  fontSize: 'xs',
  fontWeight: '500',
  color: 'text.secondary',
  textTransform: 'uppercase',
  letterSpacing: 'wider'
};
const tdStyle = css({
  px: '6',
  py: '4',
  fontSize: 'sm',
  color: 'gray.600'
});
const inputStyle = css({
  w: 'full',
  p: '2.5',
  pl: '10',
  bgColor: 'white',
  border: '1px solid',
  borderColor: 'gray.200',
  borderRadius: 'xl',
  fontSize: 'sm',
  outline: 'none',
  _focus: { borderColor: 'blue.400' }
});
const actionBtnStyle = css({
  p: '2',
  color: 'gray.400',
  borderRadius: 'lg',
  cursor: 'pointer',
  transition: 'all 0.2s',
  _hover: { color: 'blue.600', bgColor: 'blue.50' }
});
const paginationBtnStyle = css({
  p: '2',
  borderRadius: 'xl',
  border: '1px solid',
  borderColor: 'gray.200',
  cursor: 'pointer',
  transition: 'all 0.2s',
  _disabled: { opacity: 0.4, cursor: 'not-allowed' },
  _hover: { bgColor: 'gray.50' }
});
