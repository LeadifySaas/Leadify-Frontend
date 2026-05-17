import { useState } from 'react';
import { css } from '../../../../styled-system/css';
import { stack, hstack, center } from '../../../../styled-system/patterns';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Building2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useEmpresas } from '../hooks/useEmpresas';
import { usePermissions } from '@/shared/hooks/usePermissions';

export default function EmpresaPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const size = 25;

  const { canCreate, canEdit, canDelete } = usePermissions();

  const { empresasQuery, deleteEmpresa } = useEmpresas(page, size, search);
  const { data, isLoading } = empresasQuery;

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta empresa?')) {
      try {
        await deleteEmpresa(id);
      } catch (error) {
        console.error('Error al eliminar:', error);
      }
    }
  };

  return (
    <div className={stack({ gap: '6', p: '6' })}>
      {/* Header */}
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
            <Building2 size={24} />
          </div>
          <div>
            <h1
              className={css({
                fontSize: '2xl',
                fontWeight: '800',
                color: '#1A365D'
              })}
            >
              Empresas
            </h1>
            <p className={css({ fontSize: 'sm', color: 'gray.500' })}>
              Gestión integral de razones sociales y datos fiscales
            </p>
          </div>
        </div>

        {canCreate && (
          <button
            onClick={() => navigate({ to: '/administracion/empresas/nuevo' })}
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
            <Plus size={18} /> Nueva Empresa
          </button>
        )}
      </div>

      {/* Buscador */}
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
            placeholder="Buscar por razón social o CUIT..."
            className={inputStyle}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Tabla con Scroll Horizontal y Columnas Separadas */}
      <div className={cardStyle}>
        <div className={css({ overflowX: 'auto' })}>
          <table
            className={css({
              w: 'full',
              borderCollapse: 'collapse',
              minW: '1200px'
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
                <th className={css(thStyle)}>Empresa</th>
                <th className={css(thStyle)}>CUIT</th>
                <th className={css(thStyle)}>Email Facturación</th>
                <th className={css(thStyle)}>Dirección Fiscal</th>
                <th className={css(thStyle)}>Condición IVA</th>
                <th className={css(thStyle)}>Estado</th>
                {(canEdit || canDelete) && (
                  <th className={css({ ...thStyle, textAlign: 'center' })}>Acciones</th>
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className={css(tdStyle)}>
                    Cargando registros...
                  </td>
                </tr>
              ) : (
                data?.items?.map((empresa: any) => (
                  <tr
                    key={empresa.id}
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
                    <td className={css(tdStyle)}>
                      <span
                        className={css({
                          fontWeight: '700',
                          color: 'blue.700'
                        })}
                      >
                        {empresa.razonSocial || 'Sin nombre'}
                      </span>
                    </td>
                    <td className={css(tdStyle)}>
                      <code
                        className={css({
                          fontSize: 'xs',
                          bgColor: 'gray.100',
                          px: '2',
                          py: '1',
                          borderRadius: 'md'
                        })}
                      >
                        {empresa.cuit || '-'}
                      </code>
                    </td>
                    <td className={css(tdStyle)}>
                      {empresa.emailFacturacion || '-'}
                    </td>
                    <td className={css(tdStyle)}>
                      {empresa.direccionFiscal || '-'}
                    </td>
                    <td className={css(tdStyle)}>
                      <span
                        className={css({ fontSize: 'xs', color: 'gray.600' })}
                      >
                        {empresa.condicionIva}
                      </span>
                    </td>
                    <td className={css(tdStyle)}>
                      <span
                        className={css({
                          padding: '4px 8px',
                          borderRadius: '12px',
                          color: '#fff',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          backgroundColor: empresa.activo
                            ? 'state.success'
                            : 'state.error'
                        })}
                      >
                        {empresa.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    {(canEdit || canDelete) && (
                      <td className={`${tdStyle} ${css({ textAlign: 'right' })}`}>
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
                                  to: '/administracion/empresas/$id',
                                  params: { id: empresa.id.toString() }
                                })
                              }
                            >
                              <Edit size={16} />
                            </button>
                          )}
                          {canDelete && (
                            <button
                              className={`${actionBtnStyle} ${css({ color: 'red.400', _hover: { color: 'red.600', bgColor: 'red.50' } })}`}
                              title="Eliminar"
                              onClick={() => handleDelete(empresa.id)}
                            >
                              <Trash2 size={16} />
                            </button>
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
      </div>

      {/* Paginación */}
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
          de {data?.totalCount || 0} registros
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
            disabled={!data?.items || data.items.length < size}
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

// --- Estilos de Panda CSS ---
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
  letterSpacing: 'wider',
  whiteSpace: 'nowrap'
};

const tdStyle = {
  px: '6',
  py: '4',
  fontSize: 'sm',
  color: 'gray.600',
  whiteSpace: 'nowrap'
};

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
  _focus: {
    borderColor: 'blue.400',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
  }
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
  _disabled: { opacity: 0.4, cursor: 'not-allowed', pointerEvents: 'none' },
  _hover: { bgColor: 'gray.50', borderColor: 'gray.300' }
});
