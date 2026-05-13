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
  Settings2,
  X //
} from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useArticulos } from '../hooks/useArticulos';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { ArticuloForm } from '../components/ArticuloForm';
import type { Articulo } from '../schemas';

export default function ArticuloPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const size = 25;

  const { articulosQuery, deleteArticulo } = useArticulos(page, size, search);
  const { data, isLoading } = articulosQuery;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticulo, setSelectedArticulo] = useState<any>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const handleRowClick = (event: any, articulo?: Articulo) => {
    const isMobileOrTablet = window.innerWidth <= 1024;

    if (isMobileOrTablet) {
      setFormMode('edit');
      setSelectedArticulo(articulo || null);
      setIsModalOpen(true);
    }
    event.stopPropagation();
  };

  const handleAction = (mode: 'create' | 'edit', articulo?: Articulo) => {
    const isMobileOrTablet = window.innerWidth <= 1024;

    if (isMobileOrTablet) {
      setFormMode(mode);
      setSelectedArticulo(articulo || null);
      setIsModalOpen(true);
    } else {
      if (mode === 'edit' && articulo) {
        navigate({
          to: '/materiales/articulos/$id',
          params: { id: articulo.id.toString() }
        });
      } else {
        navigate({ to: '/materiales/articulos/nuevo' });
      }
    }
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [columns, setColumns] = useState([
    { id: 'imagen', label: 'Imagen', isVisible: true },
    { id: 'codigo', label: 'Código', isVisible: true },
    { id: 'nombre', label: 'Nombre / Descripción', isVisible: true },
    { id: 'precio', label: 'Precio Venta', isVisible: true },
    { id: 'stock', label: 'Stock', isVisible: true },
    { id: 'estado', label: 'Estado', isVisible: true },
    { id: 'acciones', label: 'Acciones', isVisible: true }
  ]);

  const [tempColumns, setTempColumns] = useState(columns);

  const handleOpenFilter = () => {
    setTempColumns(columns);
    setIsFilterOpen(!isFilterOpen);
  };

  const handleToggleColumn = (id: string) => {
    setTempColumns((prev) =>
      prev.map((col) =>
        col.id === id ? { ...col, isVisible: !col.isVisible } : col
      )
    );
  };

  const handleAcceptColumns = () => {
    setColumns(tempColumns);
    setIsFilterOpen(false);
  };

  const handleCancelColumns = () => {
    setIsFilterOpen(false);
  };

  const isColVisible = (id: string) =>
    columns.find((c) => c.id === id)?.isVisible;
  const visibleColumnsCount = columns.filter((c) => c.isVisible).length;

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

        <button
          onClick={() => handleAction('create')}
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
      </div>

      {/* Controles: Barra de Búsqueda y Configuración de Columnas */}
      <div className={hstack({ justifyContent: 'space-between', w: 'full' })}>
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

        {/* Dropdown de Columnas */}
        <div className={css({ position: 'relative' })}>
          <button
            onClick={handleOpenFilter}
            className={hstack({
              gap: '2',
              px: '4',
              py: '2.5',
              borderRadius: 'xl',
              border: '1px solid',
              borderColor: 'gray.200',
              fontSize: 'sm',
              fontWeight: '600',
              color: 'gray.700',
              cursor: 'pointer',
              bgColor: 'white',
              _hover: { bgColor: 'gray.50' }
            })}
          >
            <Settings2 size={16} /> Configurar Columnas
          </button>

          {isFilterOpen && (
            <div
              className={css({
                position: 'absolute',
                right: 0,
                top: '100%',
                mt: '2',
                bgColor: 'white',
                border: '1px solid',
                borderColor: 'gray.200',
                borderRadius: 'xl',
                boxShadow: 'lg',
                p: '4',
                paddingTop: '4',
                zIndex: 10,
                minWidth: '220px',
                display: 'flex',
                flexDir: 'column',
                alignItems: 'end'
              })}
            >
              <div className={stack({ gap: '3', mb: '4', width: '100%' })}>
                {tempColumns.map((col) => (
                  <label
                    key={col.id}
                    className={hstack({ gap: '2', cursor: 'pointer' })}
                  >
                    <input
                      type="checkbox"
                      checked={col.isVisible}
                      onChange={() => handleToggleColumn(col.id)}
                      className={css({
                        accentColor: 'blue.600',
                        width: '4',
                        height: '4'
                      })}
                    />
                    <span
                      className={css({ fontSize: 'sm', color: 'gray.700' })}
                    >
                      {col.label}
                    </span>
                  </label>
                ))}
              </div>
              <div
                className={css({ width: 'full', display: 'flex', gap: '4' })}
              >
                <button
                  onClick={handleAcceptColumns}
                  className={css({
                    width: 'full',
                    py: '2',
                    bgColor: 'blue.600',
                    color: 'white',
                    borderRadius: 'lg',
                    fontSize: 'sm',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    _hover: { bgColor: 'blue.700' },
                    transition: '0.2s'
                  })}
                >
                  Aceptar
                </button>
                <button
                  onClick={handleCancelColumns}
                  className={css({
                    width: 'full',
                    py: '2',
                    bgColor: 'state.error',
                    color: 'white',
                    borderRadius: 'lg',
                    fontSize: 'sm',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    _hover: { bgColor: 'red.700' },
                    transition: '0.2s'
                  })}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
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
              {isColVisible('imagen') && (
                <th className={css(thStyle)}>Imagen</th>
              )}
              {isColVisible('codigo') && (
                <th className={css(thStyle)}>Código</th>
              )}
              {isColVisible('nombre') && (
                <th className={css(thStyle)}>Nombre / Descripción</th>
              )}
              {isColVisible('precio') && (
                <th className={css(thStyle)}>Precio Venta</th>
              )}
              {isColVisible('stock') && <th className={css(thStyle)}>Stock</th>}
              {isColVisible('estado') && (
                <th className={css(thStyle)}>Estado</th>
              )}
              {isColVisible('acciones') && (
                <th className={css({ ...thStyle, textAlign: 'center' })}>
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={visibleColumnsCount} className={tdStyle}>
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
                  {isColVisible('imagen') && (
                    <td
                      className={tdStyle}
                      onClick={() => handleRowClick(articulo)}
                    >
                      <img
                        src={
                          articulo.imagenUrl ||
                          'https://placehold.co/40x40?text=Img'
                        }
                        alt={articulo.nombre}
                        className={css({
                          width: '40px',
                          height: '40px',
                          objectFit: 'cover',
                          borderRadius: 'md',
                          border: '1px solid',
                          borderColor: 'gray.200',
                          backgroundColor: 'gray.50'
                        })}
                      />
                    </td>
                  )}

                  {isColVisible('codigo') && (
                    <td
                      className={tdStyle}
                      onClick={() => handleRowClick(articulo)}
                    >
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
                  )}

                  {isColVisible('nombre') && (
                    <td
                      className={tdStyle}
                      onClick={() => handleRowClick(articulo)}
                    >
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
                  )}

                  {isColVisible('precio') && (
                    <td
                      className={tdStyle}
                      onClick={() => handleRowClick(articulo)}
                    >
                      <span
                        className={css({
                          fontWeight: '600',
                          color: 'green.600'
                        })}
                      >
                        $ {articulo.precioVenta?.toLocaleString('es-AR') || 0}
                      </span>
                    </td>
                  )}

                  {isColVisible('stock') && (
                    <td
                      className={tdStyle}
                      onClick={() => handleRowClick(articulo)}
                    >
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
                  )}

                  {isColVisible('estado') && (
                    <td
                      className={tdStyle}
                      onClick={() => handleRowClick(articulo)}
                    >
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
                  )}

                  {isColVisible('acciones') && (
                    <td
                      className={`${tdStyle} ${css({ textAlign: 'center' })}`}
                      onClick={() => handleRowClick(articulo)}
                    >
                      <div
                        className={hstack({
                          gap: '1',
                          justifyContent: 'center'
                        })}
                      >
                        <button
                          className={actionBtnStyle}
                          title="Editar"
                          onClick={() => handleAction('edit', articulo)}
                        >
                          <Edit size={16} />
                        </button>
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

      {/* --- MODAL PARA CELULARES Y TABLETS --- */}
      {isModalOpen && (
        <div className={modalOverlayStyle}>
          <div className={modalContentStyle}>
            {/* Cabecera del modal para poder cerrarlo fácilmente */}
            <div className={hstack({ justifyContent: 'flex-end', mb: '2' })}>
              <button
                onClick={() => setIsModalOpen(false)}
                className={css({
                  p: '2',
                  cursor: 'pointer',
                  color: 'gray.500',
                  _hover: { color: 'red.500' }
                })}
              >
                <X size={24} />
              </button>
            </div>

            {/* Formulario inyectado. Le pasamos isModal para que oculte su propio botón de volver */}
            <div className={css({ overflowY: 'auto', maxH: '80vh', pr: '2' })}>
              <ArticuloForm
                mode={formMode}
                initialData={selectedArticulo}
                isModal={true}
                onSuccess={() => {
                  setIsModalOpen(false); // Cierra el modal cuando se guarda correctamente
                  articulosQuery.refetch(); // Opcional: refrescar la tabla
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Estilos Consistentes Originales ---
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

// --- Estilos para el Modal ---
const modalOverlayStyle = css({
  position: 'fixed',
  top: 0,
  left: 0,
  w: 'full',
  h: 'full',
  bgColor: 'rgba(0,0,0,0.5)',
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  p: '4',
  backdropFilter: 'blur(2px)'
});
const modalContentStyle = css({
  bgColor: 'gray.50',
  w: 'full',
  maxW: '3xl',
  borderRadius: '2xl',
  p: '4',
  boxShadow: '2xl'
});
