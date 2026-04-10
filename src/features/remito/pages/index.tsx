import { useRemitos } from '../hooks/useRemitos';
import { ConfirmDialog } from '../../../shared/components/ui/ConfirmDialog';
import { Trash2, Eye, Pencil, Plus } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { css } from '../../../../styled-system/css';
import { hstack, stack } from '../../../../styled-system/patterns';

export default function RemitosPage() {
    const { remitos, isLoading, deleteRemito } = useRemitos();

    if (isLoading) return <div>Cargando movimientos...</div>;

    return (
        <div className={stack({ gap: '6', p: '2' })}>
            {/* Header con el botón de Nuevo */}
            <div className={hstack({ justifyContent: 'space-between' })}>
                <h1 className={css({ fontSize: '2xl', fontWeight: '800' })}>Remitos</h1>
                <Link to="/documentacion/remitos/nuevo" className={btnPrimaryStyle}>
                    <Plus size={18} /> Nuevo Remito
                </Link>
            </div>

            <table className={css({ w: 'full', bgColor: 'white', borderRadius: 'xl' })}>
                <thead>{/* ... tus TH */}</thead>
                <tbody>
                    {remitos.map((r) => (
                        <tr key={r.id}>
                            <td>{r.numeroRemito}</td>
                            <td>{r.cliente?.razonSocial}</td>
                            <td>{new Date(r.fechaEmision).toLocaleDateString()}</td>
                            <td>
                                <div className={hstack({ gap: '2' })}>
                                    <Link
                                        to="/documentacion/remitos/$id"
                                        params={{ id: r.id?.toString() as string }}
                                        className={actionBtnStyle('amber.500')}
                                    >
                                        <Pencil size={16} />
                                    </Link>

                                    {/* USANDO RADIX AQUÍ */}
                                    <ConfirmDialog
                                        title="¿Anular Remito?"
                                        description={`¿Estás seguro de eliminar el remito ${r.numeroRemito}? Esta acción podría afectar el stock.`}
                                        onConfirm={() => deleteRemito(r.id!)}
                                        trigger={
                                            <button className={actionBtnStyle('red.500')}>
                                                <Trash2 size={16} />
                                            </button>
                                        }
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const actionBtnStyle = (color: string) => css({
    w: '32px', h: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'lg',
    border: '1px solid', borderColor: 'gray.100', color, cursor: 'pointer', transition: '0.2s',
    _hover: { bgColor: 'white', boxShadow: 'sm', borderColor: color }
});

const paginationBtnStyle = css({
    p: '2', borderRadius: 'xl', border: '1px solid', borderColor: 'gray.200',
    cursor: 'pointer', transition: 'all 0.2s',
    _disabled: { opacity: 0.4, cursor: 'not-allowed', pointerEvents: 'none' },
    _hover: { bgColor: 'gray.50', borderColor: 'gray.300' }
});

const btnPrimaryStyle = hstack({ px: '5', py: '2.5', bgColor: 'blue.600', color: 'white', borderRadius: 'xl', fontWeight: 'bold', fontSize: 'sm', cursor: 'pointer', _hover: { bgColor: 'blue.700', transform: 'translateY(-1px)' }, transition: '0.2s', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' });

const btnFilterAction = hstack({ justifyContent: 'center', px: '4', py: '2', bgColor: 'white', border: '1px solid', borderColor: 'gray.200', borderRadius: 'xl', fontSize: 'sm', fontWeight: '700', cursor: 'pointer', _hover: { bg: 'gray.50' } });

