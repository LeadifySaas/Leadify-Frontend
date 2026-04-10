import { useState } from "react";
import { css } from '../../../../styled-system/css';
import { stack, hstack, center, flex } from '../../../../styled-system/patterns';
import { Search, Plus, Edit, Trash2, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useClientes } from "../hooks/useClientes";

export default function ClientePage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const size = 25;

    const { clientesQuery } = useClientes(page, size, search);
    const { data, isLoading } = clientesQuery;

    return (
        <div className={stack({ gap: '6', p: '6' })}>

            {/* Header con Título y Botón Nuevo */}
            <div className={hstack({ justifyContent: 'space-between' })}>
                <div className={hstack({ gap: '3' })}>
                    <div className={center({ p: '2.5', bgColor: 'blue.50', color: 'blue.600', borderRadius: 'xl' })}>
                        <Users size={24} />
                    </div>
                    <div>
                        <h1 className={css({ fontSize: '2xl', fontWeight: '800', color: '#1A365D' })}>Clientes</h1>
                        <p className={css({ fontSize: 'sm', color: 'gray.500' })}>Gestioná la base de datos de clientes fiscales</p>
                    </div>
                </div>

                <button
                    onClick={() => navigate({ to: '/administracion/clientes/nuevo' })}
                    className={hstack({
                        px: '5', py: '2.5', bgColor: 'blue.600', color: 'white',
                        borderRadius: 'xl', fontWeight: 'bold', cursor: 'pointer',
                        _hover: { bgColor: 'blue.700' }, transition: 'all 0.2s'
                    })}
                >
                    <Plus size={18} /> Nuevo Cliente
                </button>
            </div>

            {/* Barra de Búsqueda */}
            <div className={hstack({ gap: '4', w: 'full', maxW: 'md' })}>
                <div className={css({ position: 'relative', flex: 1 })}>
                    <Search className={css({ position: 'absolute', left: '3', top: '50%', transform: 'translateY(-50%)', color: 'gray.400' })} size={18} />
                    <input
                        placeholder="Buscar por razón social o CUIT..."
                        className={inputStyle}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Tabla Estilizada como Card */}
            <div className={cardStyle}>
                <table className={css({ w: 'full', borderCollapse: 'collapse' })}>
                    <thead>
                        <tr className={css({ borderBottom: '1px solid', borderColor: 'gray.100', textAlign: 'left' })}>
                            <th className={css(thStyle)}>Razón Social</th>
                            <th className={css(thStyle)}>CUIT</th>
                            <th className={css(thStyle)}>Email</th>
                            <th className={css(thStyle)}>Estado</th>
                            <th className={css({ ...thStyle, textAlign: 'right' })}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={4} className={css(tdStyle)}>Cargando datos del servidor...</td></tr>
                        ) : data?.items?.map((cliente: any) => (
                            <tr key={cliente.id} className={css({
                                borderBottom: '1px solid',
                                borderColor: 'gray.50',
                                _hover: { bgColor: 'gray.50/50' },
                                transition: 'colors 0.2s'
                            })}>
                                <td className={css(tdStyle)}>
                                    <span className={css({ fontWeight: '700', color: 'blue.700' })}>{cliente.razonSocial}</span>
                                </td>
                                <td className={css(tdStyle)}>
                                    <code className={css({ fontSize: 'xs', bgColor: 'gray.100', px: '2', py: '1', borderRadius: 'md' })}>{cliente.cuit}</code>
                                </td>
                                <td className={css(tdStyle)}>{cliente.email}</td>
                                <td className={css(tdStyle)}>
                                    <span
                                        className={css({
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            color: '#fff',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            backgroundColor: cliente.activo ? '#28a745' : '#dc3545'
                                        })}
                                    >
                                        {cliente.activo ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td className={`${tdStyle} ${css({ textAlign: 'right' })}`}>
                                    <div className={hstack({ gap: '1', justifyContent: 'flex-end' })}>
                                        <button className={actionBtnStyle} title="Editar"
                                            onClick={() => navigate({
                                                to: '/administracion/clientes/$id',
                                                params: { id: cliente.id.toString() }
                                            })}>
                                            <Edit size={16} />
                                        </button>
                                        <button className={`${actionBtnStyle} ${css({ color: 'red.400', _hover: { color: 'red.600', bgColor: 'red.50' } })}`} title="Eliminar"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer con Paginación */}
            <div className={hstack({ justifyContent: 'space-between', px: '2' })}>
                <p className={css({ fontSize: 'sm', color: 'gray.500', fontWeight: '500' })}>
                    Mostrando <span className={css({ color: 'blue.600', fontWeight: 'bold' })}>{data?.items?.length || 0}</span> de {data?.totalCount || 0} registros
                </p>

                <div className={hstack({ gap: '2' })}>
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className={paginationBtnStyle}
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <div className={center({ px: '4', h: '40px', borderRadius: 'xl', border: '1px solid', borderColor: 'gray.200', fontSize: 'sm', fontWeight: 'bold' })}>
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

// --- Estilos Consistentes (Panda CSS) ---
const cardStyle = css({
    bgColor: 'white',
    borderRadius: '2xl',
    border: '1px solid',
    borderColor: 'gray.100',
    boxShadow: 'sm',
    overflow: 'hidden'
});

const thStyle = {
    px: '6', py: '4',
    fontSize: 'xs',
    fontWeight: '800',
    color: 'gray.400',
    textTransform: 'uppercase',
    letterSpacing: 'wider'
};

const tdStyle = {
    px: '6', py: '4',
    fontSize: 'sm',
    color: 'gray.600'
};

const inputStyle = css({
    w: 'full', p: '2.5', pl: '10',
    bgColor: 'white', border: '1px solid', borderColor: 'gray.200',
    borderRadius: 'xl', fontSize: 'sm', outline: 'none',
    _focus: { borderColor: 'blue.400', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }
});

const actionBtnStyle = css({
    p: '2', color: 'gray.400', borderRadius: 'lg', cursor: 'pointer',
    transition: 'all 0.2s',
    _hover: { color: 'blue.600', bgColor: 'blue.50' }
});

const paginationBtnStyle = css({
    p: '2', borderRadius: 'xl', border: '1px solid', borderColor: 'gray.200',
    cursor: 'pointer', transition: 'all 0.2s',
    _disabled: { opacity: 0.4, cursor: 'not-allowed', pointerEvents: 'none' },
    _hover: { bgColor: 'gray.50', borderColor: 'gray.300' }
});