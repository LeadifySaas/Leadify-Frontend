import { useState } from 'react';
import { css } from '../../../../styled-system/css';
import { stack, hstack, center } from '../../../../styled-system/patterns';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  FileText,
  ChevronLeft,
  ChevronRight,
  FileDown,
  RefreshCw,
  FileSpreadsheet
} from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useRemitos } from '../hooks/useRemitos';
import { remitoApi } from '../api'; // Asegúrate de importar tu API
import { ConfirmDialog } from '../../../shared/components/ui/ConfirmDialog';
import { StatusModal } from '../components/StatusModal';

export default function RemitosPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const size = 25;

  const { remitos, totalCount, isLoading, deleteRemito, updateStatus } =
    useRemitos(page, size, search);

  const [statusModal, setStatusModal] = useState<{
    isOpen: boolean;
    remito: any;
  }>({
    isOpen: false,
    remito: null
  });

  const handleDownloadPdf = async (id: number) => {
    try {
      const blobUrl = await remitoApi.verPdf(id);

      const nuevaVentana = window.open(blobUrl, '_blank');

      if (!nuevaVentana) {
        alert('Por favor, permite las ventanas emergentes para ver el PDF');
      }
    } catch (error: any) {
      console.error('Error al generar PDF:', error);
      alert(
        'No se pudo generar el PDF. Verifica que el remito tenga todos los datos cargados.'
      );
    }
  };

  const handleExportExcel = async () => {
    try {
      await remitoApi.exportarExcel(search);
    } catch (error) {
      console.error('Error al exportar Excel:', error);
    }
  };

  const handleConfirmStatusChange = async (id: number, nuevoEstado: string) => {
    try {
      await updateStatus({ id, nuevoEstado });
      setStatusModal({ isOpen: false, remito: null });
    } catch (error) {
      console.error('Error al actualizar estado:', error);
    }
  };

  return (
    <div className={stack({ gap: '6', p: '6' })}>
      {/* Header con Título y Acciones */}
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
            <FileText size={24} />
          </div>
          <div>
            <h1
              className={css({
                fontSize: '2xl',
                fontWeight: '800',
                color: '#1A365D'
              })}
            >
              Remitos
            </h1>
            <p className={css({ fontSize: 'sm', color: 'gray.500' })}>
              Gestioná los remitos y comprobantes
            </p>
          </div>
        </div>

        <div className={hstack({ gap: '3' })}>
          {/* BOTÓN EXCEL */}
          <button
            onClick={handleExportExcel}
            className={btnExcelStyle}
            title="Exportar listado a Excel"
          >
            <FileSpreadsheet size={18} /> Excel
          </button>

          {/* BOTÓN NUEVO */}
          <button
            onClick={() => navigate({ to: '/documentacion/remitos/nuevo' })}
            className={btnPrimaryStyle}
          >
            <Plus size={18} /> Nuevo Remito
          </button>
        </div>
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
            placeholder="Buscar por número o cliente..."
            className={inputStyle}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // Resetear a pag 1 al buscar
            }}
          />
        </div>
      </div>

      {/* Tabla */}
      <div className={cardStyle}>
        <table className={css({ w: 'full', borderCollapse: 'collapse' })}>
          <thead>
            <tr
              className={css({
                borderBottom: '1px solid',
                borderBottomColor: 'gray.200',
                textAlign: 'left'
              })}
            >
              <th className={css(thStyle)}>Número</th>
              <th className={css(thStyle)}>Cliente</th>
              <th className={css(thStyle)}>Fecha</th>
              <th className={css(thStyle)}>Creado Por</th>
              <th className={css(thStyle)}>Estado</th>
              <th className={css({ ...thStyle, textAlign: 'center' })}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={5}
                  className={css(tdStyle, { textAlign: 'center', py: '10' })}
                >
                  Cargando remitos...
                </td>
              </tr>
            ) : !remitos || remitos.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className={css(tdStyle, { textAlign: 'center', py: '10' })}
                >
                  No se encontraron remitos.
                </td>
              </tr>
            ) : (
              remitos.map((r: any) => (
                <tr key={r.id} className={rowStyle}>
                  <td className={css(tdStyle)}>
                    <code className={numeroRemitoStyle}>{r.numeroRemito}</code>
                  </td>
                  <td className={css(tdStyle)}>
                    <div className={stack({ gap: '0' })}>
                      <span
                        className={css({
                          fontWeight: '700',
                          color: 'gray.800'
                        })}
                      >
                        {r.clienteNombre || 'S/D'}
                      </span>
                      <span
                        className={css({ fontSize: 'xs', color: 'gray.400' })}
                      >
                        {r.sedeNombre}
                      </span>
                    </div>
                  </td>
                  <td className={css(tdStyle)}>
                    <span
                      className={css({ fontWeight: '500', color: 'gray.700' })}
                    >
                      {r.fechaEmision
                        ? new Date(r.fechaEmision).toLocaleDateString()
                        : '---'}
                    </span>
                  </td>
                  <td className={css(tdStyle)}>
                    <span
                      className={css({ fontWeight: '500', color: 'gray.700' })}
                    >
                      {r.creadoPor || '---'}
                    </span>
                  </td>
                  <td className={css(tdStyle)}>
                    <span className={statusBadgeStyle(r.estado)}>
                      {r.estado || 'Pendiente'}
                    </span>
                  </td>
                  <td
                    className={`${css(tdStyle)} ${css({ textAlign: 'right' })}`}
                  >
                    <div
                      className={hstack({
                        gap: '1',
                        justifyContent: 'center'
                      })}
                    >
                      <button
                        className={actionBtnStyle}
                        title="Descargar PDF"
                        onClick={() => handleDownloadPdf(r.id)}
                      >
                        <FileDown size={16} />
                      </button>

                      <button
                        className={actionBtnStyle}
                        title="Cambiar Estado"
                        onClick={() =>
                          setStatusModal({ isOpen: true, remito: r })
                        }
                      >
                        <RefreshCw size={16} />
                      </button>

                      <button
                        className={actionBtnStyle}
                        title="Editar"
                        onClick={() =>
                          navigate({
                            to: '/documentacion/remitos/$id',
                            params: { id: r.id.toString() }
                          })
                        }
                      >
                        <Edit size={16} />
                      </button>

                      <ConfirmDialog
                        title="¿Anular Remito?"
                        description={`Estás por anular el remito "${r.numeroRemito}". Esta acción no se puede deshacer.`}
                        onConfirm={() => deleteRemito(r.id)}
                        confirmText="Sí, anular"
                        trigger={
                          <button
                            className={css({
                              color: 'red.400',
                              cursor: 'pointer',
                              p: '2',
                              borderRadius: 'lg',
                              _hover: { color: 'red.600', bgColor: 'red.50' }
                            })}
                          >
                            <Trash2 size={18} />
                          </button>
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
            {remitos?.length || 0}
          </span>{' '}
          de {totalCount || 0} remitos
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
            disabled={(remitos?.length || 0) < size}
            onClick={() => setPage((p) => p + 1)}
            className={paginationBtnStyle}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <StatusModal
        isOpen={statusModal.isOpen}
        onClose={() => setStatusModal({ isOpen: false, remito: null })}
        remitoNumero={statusModal.remito?.numeroRemito || ''}
        currentStatus={statusModal.remito?.estado || ''}
        onConfirm={(newStatus) => {
          if (statusModal.remito?.id) {
            handleConfirmStatusChange(statusModal.remito.id, newStatus);
          }
        }}
      />
    </div>
  );
}

// --- ESTILOS ---
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
  fontSize: 'sm',
  fontWeight: '500',
  color: 'text.secondary',
  textTransform: 'uppercase',
  letterSpacing: 'wider'
};
const tdStyle = { px: '6', py: '4', fontSize: 'md', color: 'gray.700' };
const rowStyle = css({
  borderBottom: '1px solid',
  borderBottomColor: 'gray.200',
  _hover: { bgColor: 'gray.50/50' },
  transition: 'colors 0.2s',
  _last: {
    borderBottom: 'none'
  }
});

const btnPrimaryStyle = hstack({
  px: '5',
  py: '2.5',
  bgColor: 'blue.600',
  color: 'white',
  borderRadius: 'xl',
  fontWeight: 'bold',
  cursor: 'pointer',
  _hover: { bgColor: 'blue.700' },
  transition: 'all 0.2s'
});

const btnExcelStyle = hstack({
  px: '5',
  py: '2.5',
  bgColor: 'green.600',
  color: 'white',
  borderRadius: 'xl',
  fontWeight: 'bold',
  cursor: 'pointer',
  _hover: { bgColor: 'green.700' },
  transition: 'all 0.2s'
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
const numeroRemitoStyle = css({
  fontSize: 'sm',
  bgColor: 'blue.50',
  color: 'blue.700',
  px: '2',
  py: '1',
  borderRadius: 'md',
  fontWeight: 'bold'
});

const statusBadgeStyle = (status: string) => {
  const baseStyle = {
    px: '3',
    py: '1',
    borderRadius: 'md',
    fontSize: 'sm',
    fontWeight: 'bold'
  } as const;

  switch (status) {
    case 'Entregado':
      return css({ ...baseStyle, bgColor: 'green.600', color: 'white' });
    case 'Anulado':
      return css({ ...baseStyle, bgColor: 'red.600', color: 'white' });
    case 'Pendiente':
    default:
      return css({ ...baseStyle, bgColor: 'amber.500', color: 'white' });
  }
};
