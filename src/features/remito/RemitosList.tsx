// import { useState } from 'react';
// import { Link } from '@tanstack/react-router';
// import { css } from '../../../styled-system/css';
// import { stack, hstack, center, grid, flex } from '../../../styled-system/patterns';
// import {
//     Plus, FileText, Search, Filter, Pencil, Eye, Trash2,
//     ChevronLeft, ChevronRight, AlertCircle, MoreHorizontal
// } from 'lucide-react';

// // 1. Configuración de Badges por Estado
// const STATUS_CONFIG: Record<string, { bg: string, text: string, label: string }> = {
//     'Entregado': { bg: 'green.50', text: 'green.600', label: 'ENTREGADO' },
//     'En Camino': { bg: 'blue.50', text: 'blue.600', label: 'EN CAMINO' },
//     'Pendiente': { bg: 'orange.50', text: 'orange.600', label: 'PENDIENTE' },
//     'Cancelado': { bg: 'red.50', text: 'red.600', label: 'CANCELADO' },
// };

// export default function RemitosPage() {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedId, setSelectedId] = useState<string | null>(null);

//     const openDeleteModal = (id: string) => {
//         setSelectedId(id);
//         setIsModalOpen(true);
//     };

//     return (
//         <div className={stack({ gap: '6', p: '2', position: 'relative', minH: '100vh' })}>

//             {/* Header */}
//             <div className={hstack({ justifyContent: 'space-between' })}>
//                 <div className={stack({ gap: '1' })}>
//                     <h1 className={css({ fontSize: '2xl', fontWeight: '800', color: '#1A365D' })}>Gestión de Remitos</h1>
//                     <p className={css({ color: 'gray.500', fontSize: 'sm' })}>Monitoreo de despachos y logística en tiempo real.</p>
//                 </div>
//                 <Link to="/documentacion/remitos/nuevo" className={btnPrimaryStyle}>
//                     <Plus size={18} /> Nuevo Remito
//                 </Link>
//             </div>

//             {/* Filtros */}
//             <div className={stack({ p: '5', bgColor: 'white', borderRadius: '2xl', border: '1px solid', borderColor: 'gray.100', boxShadow: 'sm', gap: '4' })}>
//                 <div className={grid({ columns: { base: 1, md: 3, lg: 5 }, gap: '4' })}>
//                     <div className={filterContainerStyle}>
//                         <Search size={16} className={css({ color: 'gray.400' })} />
//                         <input placeholder="Nro de remito..." className={inputBaseStyle} />
//                     </div>
//                     <select className={selectStyle}>
//                         <option>Sede (Todas)</option>
//                         <option>Buenos Aires</option>
//                         <option>Córdoba</option>
//                         <option>Rosario</option>
//                     </select>
//                     <select className={selectStyle}>
//                         <option>Estado (Todos)</option>
//                         <option>Entregado</option>
//                         <option>En Camino</option>
//                         <option>Pendiente</option>
//                     </select>
//                     <div className={filterContainerStyle}>
//                         <input type="date" className={inputBaseStyle} />
//                     </div>
//                     <button className={btnFilterAction}>
//                         <Filter size={16} /> Filtrar
//                     </button>
//                 </div>
//             </div>

//             {/* Contenedor Tabla y Paginación */}
//             <div className={css({ bgColor: 'white', borderRadius: '2xl', border: '1px solid', borderColor: 'gray.100', overflow: 'hidden', boxShadow: 'sm' })}>
//                 <div className={css({ overflowX: 'auto' })}>
//                     <table className={css({ w: 'full', borderCollapse: 'collapse' })}>
//                         <thead>
//                             <tr className={css({ bgColor: 'gray.50/50', borderBottom: '1px solid', borderColor: 'gray.100', textAlign: 'left' })}>
//                                 <th className={tableHeaderStyle}>Número</th>
//                                 <th className={tableHeaderStyle}>Cliente / Destino</th>
//                                 <th className={tableHeaderStyle}>Fecha</th>
//                                 <th className={tableHeaderStyle}>Estado</th>
//                                 <th className={tableHeaderStyle}>Items</th>
//                                 <th className={tableHeaderStyle + css({ textAlign: 'right' })}>Acciones</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <RemitoRow id="RE-000125" cliente="Distribuidora Salta" fecha="02/04/2026" status="Entregado" items={12} onDelete={openDeleteModal} />
//                             <RemitoRow id="RE-000126" cliente="Sede Central Córdoba" fecha="02/04/2026" status="En Camino" items={5} onDelete={openDeleteModal} />
//                             <RemitoRow id="RE-000127" cliente="Logística Sur S.A." fecha="01/04/2026" status="Pendiente" items={8} onDelete={openDeleteModal} />
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* PAGINACIÓN MEJORADA */}
//                 <div className={hstack({ justifyContent: 'space-between', p: '4', borderTop: '1px solid', borderColor: 'gray.100', bgColor: 'gray.50/30' })}>
//                     <div className={hstack({ gap: '2' })}>
//                         <span className={css({ fontSize: 'sm', color: 'gray.500' })}>Filas por página:</span>
//                         <select className={css({ bg: 'transparent', fontSize: 'sm', fontWeight: '600', outline: 'none', cursor: 'pointer' })}>
//                             <option>10</option>
//                             <option>25</option>
//                             <option>50</option>
//                         </select>
//                     </div>

//                     <div className={hstack({ gap: '1' })}>
//                         <button className={pageArrowStyle}><ChevronLeft size={18} /></button>
//                         <button className={pageNumberStyle({ active: true })}>1</button>
//                         <button className={pageNumberStyle({ active: false })}>2</button>
//                         <button className={pageNumberStyle({ active: false })}>3</button>
//                         <span className={css({ px: '2', color: 'gray.400' })}><MoreHorizontal size={14} /></span>
//                         <button className={pageNumberStyle({ active: false })}>12</button>
//                         <button className={pageArrowStyle}><ChevronRight size={18} /></button>
//                     </div>
//                 </div>
//             </div>

//             {/* MODAL DE ELIMINACIÓN */}
//             {isModalOpen && (
//                 <div className={modalOverlayStyle} onClick={() => setIsModalOpen(false)}>
//                     <div className={modalContentStyle} onClick={e => e.stopPropagation()}>
//                         <center className={css({ mb: '4', color: 'red.500', p: '4', bgColor: 'red.50', w: 'fit-content', mx: 'auto', borderRadius: 'full' })}>
//                             <AlertCircle size={32} />
//                         </center>
//                         <h2 className={css({ fontSize: 'xl', fontWeight: '800', textAlign: 'center', mb: '2', color: 'gray.800' })}>¿Confirmar eliminación?</h2>
//                         <p className={css({ textAlign: 'center', color: 'gray.500', fontSize: 'sm', mb: '8', lineHeight: 'relaxed' })}>
//                             Estás intentando eliminar el remito <span className={css({ fontWeight: 'bold', color: 'gray.900' })}>{selectedId}</span>.<br />Esta operación es irreversible.
//                         </p>
//                         <div className={grid({ columns: 2, gap: '3' })}>
//                             <button onClick={() => setIsModalOpen(false)} className={btnCancelStyle}>Cancelar</button>
//                             <button onClick={() => setIsModalOpen(false)} className={btnDeleteStyle}>Sí, eliminar</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// // --- Componentes de Fila ---

// function RemitoRow({ id, cliente, fecha, status, items, onDelete }: any) {
//     const config = STATUS_CONFIG[status] || STATUS_CONFIG['Pendiente'];

//     return (
//         <tr className={css({ borderBottom: '1px solid', borderColor: 'gray.50', _hover: { bgColor: 'blue.50/30' }, transition: '0.2s' })}>
//             <td className={css({ p: '4', fontSize: 'sm', fontWeight: '700', color: 'blue.900' })}>{id}</td>
//             <td className={css({ p: '4', fontSize: 'sm', color: 'gray.600', fontWeight: '500' })}>{cliente}</td>
//             <td className={css({ p: '4', fontSize: 'sm', color: 'gray.500' })}>{fecha}</td>
//             <td className={css({ p: '4' })}>
//                 <span className={css({
//                     px: '2.5', py: '1', borderRadius: 'md', fontSize: '10px', fontWeight: '800',
//                     bgColor: config.bg, color: config.text, border: '1px solid', borderColor: 'transparent'
//                 })}>
//                     {config.label}
//                 </span>
//             </td>
//             <td className={css({ p: '4', fontSize: 'sm', color: 'gray.600', textAlign: 'center' })}>{items}</td>
//             <td className={css({ p: '4', textAlign: 'right' })}>
//                 <div className={hstack({ gap: '1.5', justifyContent: 'flex-end' })}>
//                     <button title="Ver" className={actionBtnStyle('blue.500')}><Eye size={16} /></button>
//                     <Link to="/documentacion/remitos/$id" params={{ id }} className={actionBtnStyle('amber.500')}><Pencil size={16} /></Link>
//                     <button title="Eliminar" onClick={() => onDelete(id)} className={actionBtnStyle('red.500')}><Trash2 size={16} /></button>
//                 </div>
//             </td>
//         </tr>
//     );
// }

// // --- Estilos de UI ---

// const tableHeaderStyle = css({ p: '4', fontSize: '11px', fontWeight: '800', color: 'gray.400', textTransform: 'uppercase', letterSpacing: 'wider' });
// const filterContainerStyle = hstack({ px: '3', py: '2', bgColor: 'gray.50', borderRadius: 'xl', border: '1px solid', borderColor: 'gray.200', _focusWithin: { borderColor: 'blue.400', bgColor: 'white' } });
// const inputBaseStyle = css({ outline: 'none', bg: 'transparent', fontSize: 'sm', w: 'full', color: 'gray.700' });
// const selectStyle = css({ px: '3', py: '2', bgColor: 'gray.50', borderRadius: 'xl', border: '1px solid', borderColor: 'gray.200', fontSize: 'sm', outline: 'none', cursor: 'pointer', _hover: { borderColor: 'gray.300' } });

// const btnPrimaryStyle = hstack({ px: '5', py: '2.5', bgColor: 'blue.600', color: 'white', borderRadius: 'xl', fontWeight: 'bold', fontSize: 'sm', cursor: 'pointer', _hover: { bgColor: 'blue.700', transform: 'translateY(-1px)' }, transition: '0.2s', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' });
// const btnFilterAction = hstack({ justifyContent: 'center', px: '4', py: '2', bgColor: 'white', border: '1px solid', borderColor: 'gray.200', borderRadius: 'xl', fontSize: 'sm', fontWeight: '700', cursor: 'pointer', _hover: { bg: 'gray.50' } });

// // Paginación
// const pageArrowStyle = center({ w: '32px', h: '32px', borderRadius: 'lg', border: '1px solid', borderColor: 'gray.200', color: 'gray.600', cursor: 'pointer', _hover: { bg: 'white', boxShadow: 'xs' } });
// const pageNumberStyle = ({ active }: { active: boolean }) => css({
//     w: '32px', h: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'lg',
//     fontSize: 'xs', fontWeight: '700', cursor: 'pointer', transition: '0.2s',
//     bgColor: active ? 'blue.600' : 'transparent',
//     color: active ? 'white' : 'gray.600',
//     _hover: active ? {} : { bg: 'gray.100' }
// });

// // Acciones Fila
// const actionBtnStyle = (color: string) => css({
//     w: '32px', h: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'lg',
//     border: '1px solid', borderColor: 'gray.100', color, cursor: 'pointer', transition: '0.2s',
//     _hover: { bgColor: 'white', boxShadow: 'sm', borderColor: color }
// });

// // Modal
// const modalOverlayStyle = css({ position: 'fixed', inset: 0, bgColor: 'slate.900/40', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', p: '4' });
// const modalContentStyle = css({ bgColor: 'white', p: '8', borderRadius: '3xl', maxWidth: '400px', w: 'full', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' });
// const btnCancelStyle = css({ px: '4', py: '3', borderRadius: 'xl', fontWeight: 'bold', border: '1px solid', borderColor: 'gray.200', cursor: 'pointer', fontSize: 'sm', _hover: { bg: 'gray.50' } });
// const btnDeleteStyle = css({ px: '4', py: '3', borderRadius: 'xl', fontWeight: 'bold', bgColor: 'red.600', color: 'white', cursor: 'pointer', fontSize: 'sm', _hover: { bgColor: 'red.700' } });