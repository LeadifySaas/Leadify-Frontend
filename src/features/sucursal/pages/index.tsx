import { useState } from "react";
import { css } from '../../../../styled-system/css';
import { stack, hstack, center } from '../../../../styled-system/patterns';
import { Search, Plus, Edit, Trash2, Building2, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useSedes } from "../hooks/useSedes";
import { ConfirmDialog } from "../components/ConfirmDialog";

export default function SucursalesPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const size = 25;

    const { sedesQuery, deleteSede } = useSedes(page, size, search);
    const { data, isLoading } = sedesQuery;

    const handleDelete = async (id: number) => {
        try {
            await deleteSede(id);
        } catch (e) {
            console.error(e);
            alert("No se pudo eliminar la sede.");
        }
    };

    return (
        <div className={stack({ gap: '6', p: '6' })}>

            {/* Header con Título y Botón Nuevo */}
            <div className={hstack({ justifyContent: 'space-between' })}>
                <div className={hstack({ gap: '3' })}>
                    <div className={center({ p: '2.5', bgColor: 'blue.50', color: 'blue.600', borderRadius: 'xl' })}>
                        <Building2 size={24} />
                    </div>
                    <div>
                        <h1 className={css({ fontSize: '2xl', fontWeight: '800', color: '#1A365D' })}>Sucursales / Sedes</h1>
                        <p className={css({ fontSize: 'sm', color: 'gray.500' })}>Gestioná las sucursales y puntos de entrega de clientes</p>
                    </div>
                </div>

                <button
                    onClick={() => navigate({ to: '/administracion/sucursales/nuevo' })}
                    className={hstack({
                        px: '5', py: '2.5', bgColor: 'blue.600', color: 'white',
                        borderRadius: 'xl', fontWeight: 'bold', cursor: 'pointer',
                        _hover: { bgColor: 'blue.700' }, transition: 'all 0.2s'
                    })}
                >
                    <Plus size={18} /> Nueva Sede
                </button>
            </div>

            {/* Barra de Búsqueda */}
            <div className={hstack({ gap: '4', w: 'full', maxW: 'md' })}>
                <div className={css({ position: 'relative', flex: 1 })}>
                    <Search className={css({ position: 'absolute', left: '3', top: '50%', transform: 'translateY(-50%)', color: 'gray.400' })} size={18} />
                    <input
                        placeholder="Buscar por sede o localidad..."
                        className={inputStyle}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Tabla Estilizada */}
            <div className={cardStyle}>
                <table className={css({ w: 'full', borderCollapse: 'collapse' })}>
                    <thead>
                        <tr className={css({ borderBottom: '1px solid', borderColor: 'gray.100', textAlign: 'left', bgColor: 'gray.50/50' })}>
                            <th className={css(thStyle)}>Sede / Cliente</th>
                            <th className={css(thStyle)}>Ubicación</th>
                            <th className={css(thStyle)}>Contacto</th>
                            <th className={css(thStyle)}>Estado</th>
                            <th className={css({ ...thStyle, textAlign: 'right' })}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={5} className={css({ p: '10', textAlign: 'center', color: 'gray.400' })}>Cargando sucursales...</td></tr>
                        ) : data?.items?.map((sede: any) => (
                            <tr key={sede.id} className={css({
                                borderBottom: '1px solid',
                                borderColor: 'gray.50',
                                _hover: { bgColor: 'gray.50/30' },
                                transition: 'colors 0.2s'
                            })}>
                                <td className={css(tdStyle)}>
                                    <div className={stack({ gap: '0' })}>
                                        <span className={css({ fontWeight: '700', color: 'gray.800' })}>{sede.nombre}</span>
                                        {/* Cambiamos sede.clienteId por sede.clienteNombre */}
                                        <span className={css({ fontSize: 'xs', color: 'blue.600', fontWeight: '600' })}>
                                            {sede.clienteNombre}
                                        </span>
                                    </div>
                                </td>
                                <td className={css(tdStyle)}>
                                    <div className={hstack({ gap: '1.5', color: 'gray.600' })}>
                                        <MapPin size={14} className={css({ color: 'gray.400', flexShrink: 0 })} />
                                        <div className={stack({ gap: '0' })}>
                                            <span className={css({ fontSize: 'sm', fontWeight: '500' })}>{sede.localidad}, {sede.provincia}</span>
                                            <span className={css({ fontSize: 'xs', color: 'gray.400' })}>{sede.direccion} (CP: {sede.codigoPostal})</span>
                                        </div>
                                    </div>
                                </td>
                                <td className={css(tdStyle)}>
                                    <div className={stack({ gap: '0' })}>
                                        <span className={css({ fontSize: 'sm', fontWeight: '500' })}>{sede.contactoNombre || 'N/A'}</span>
                                        <span className={css({ fontSize: 'xs', color: 'gray.400' })}>{sede.contactoTelefono || 'S/D'}</span>
                                    </div>
                                </td>
                                <td className={css(tdStyle)}>
                                    <span className={css({
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        color: '#fff',
                                        fontSize: '10px',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        backgroundColor: sede.activo ? '#28a745' : '#dc3545'
                                    })}>
                                        {sede.activo ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td className={`${tdStyle} ${css({ textAlign: 'right' })}`}>
                                    <div className={hstack({ gap: '1', justifyContent: 'flex-end' })}>
                                        <button className={actionBtnStyle} title="Editar"
                                            onClick={() => navigate({
                                                to: '/administracion/sucursales/$id',
                                                params: { id: sede.id.toString() }
                                            })}>
                                            <Edit size={16} />
                                        </button>
                                        <ConfirmDialog
                                            title="¿Eliminar Sede?"
                                            description={`Estás por borrar "${sede.nombre}". Esta acción no se puede deshacer.`}
                                            onConfirm={() => handleDelete(sede.id)}
                                            confirmText="Sí, eliminar"
                                            trigger={
                                                <button className={css({ color: 'red.500', cursor: 'pointer', p: '2', borderRadius: 'lg', _hover: { bgColor: 'red.50' } })}>
                                                    <Trash2 size={18} />
                                                </button>
                                            }
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {(!isLoading && (!data?.items || data.items.length === 0)) && (
                            <tr><td colSpan={5} className={css({ p: '10', textAlign: 'center', color: 'gray.500' })}>No hay sucursales registradas.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer con Paginación */}
            <div className={hstack({ justifyContent: 'space-between', px: '2' })}>
                <p className={css({ fontSize: 'sm', color: 'gray.500', fontWeight: '500' })}>
                    Mostrando <span className={css({ color: 'blue.600', fontWeight: 'bold' })}>{data?.items?.length || 0}</span> de {data?.totalCount || 0} sedes
                </p>

                <div className={hstack({ gap: '2' })}>
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className={paginationBtnStyle}
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <div className={center({ px: '4', h: '38px', borderRadius: 'xl', border: '1px solid', borderColor: 'gray.200', fontSize: 'sm', fontWeight: 'bold' })}>
                        {page}
                    </div>
                    <button
                        disabled={data?.items?.length < size}
                        onClick={() => setPage(p => p + 1)}
                        className={paginationBtnStyle}
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- Estilos Consistentes ---
const cardStyle = css({ bgColor: 'white', borderRadius: '2xl', border: '1px solid', borderColor: 'gray.100', boxShadow: 'sm', overflow: 'hidden' });
const thStyle = { px: '6', py: '4', fontSize: 'xs', fontWeight: '800', color: 'gray.400', textTransform: 'uppercase', letterSpacing: 'wider' };
const tdStyle = { px: '6', py: '4', fontSize: 'sm', color: 'gray.600' };
const inputStyle = css({ w: 'full', p: '2.5', pl: '10', bgColor: 'white', border: '1px solid', borderColor: 'gray.200', borderRadius: 'xl', fontSize: 'sm', outline: 'none', transition: 'all 0.2s', _focus: { borderColor: 'blue.400' } });
const actionBtnStyle = css({ p: '2', color: 'gray.400', borderRadius: 'lg', cursor: 'pointer', transition: 'all 0.2s', _hover: { color: 'blue.600', bgColor: 'blue.50' } });
const paginationBtnStyle = css({ p: '2', borderRadius: 'xl', border: '1px solid', borderColor: 'gray.200', cursor: 'pointer', transition: 'all 0.2s', _disabled: { opacity: 0.4, cursor: 'not-allowed' }, _hover: { bgColor: 'gray.50' } });