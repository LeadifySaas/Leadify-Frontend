// import { useState } from 'react';
// import { css } from '../../../styled-system/css';
// import { stack, grid, hstack, center } from '../../../styled-system/patterns';
// import { Save, Plus, Trash2, ArrowLeft, FileText } from 'lucide-react';
// import { useNavigate } from '@tanstack/react-router';

// interface ItemRemito {
//     id: string;
//     producto: string;
//     cantidad: number;
// }

// interface Props {
//     mode: 'create' | 'edit';
//     initialData?: any; // Aquí iría tu tipo Remito
// }

// export function RemitoForm({ mode, initialData }: Props) {
//     const navigate = useNavigate();

//     // Estado para los ítems de la tabla dinámica
//     const [items, setItems] = useState<ItemRemito[]>(
//         initialData?.items || [{ id: '1', producto: '', cantidad: 1 }]
//     );

//     const addItem = () => {
//         setItems([...items, { id: crypto.randomUUID(), producto: '', cantidad: 1 }]);
//     };

//     const removeItem = (id: string) => {
//         if (items.length > 1) {
//             setItems(items.filter(item => item.id !== id));
//         }
//     };

//     const handleSave = () => {
//         // Aquí dispararías tu mutación de TanStack Query hacia el backend de .NET
//         console.log("Guardando remito...", { items });
//         navigate({ to: '/documentacion/remitos' });
//     };

//     return (
//         <div className={stack({ gap: '6', p: '2' })}>
//             {/* Header del Formulario */}
//             <div className={hstack({ justifyContent: 'space-between' })}>
//                 <div className={hstack({ gap: '4' })}>
//                     <button
//                         onClick={() => navigate({ to: '/documentacion/remitos' })}
//                         className={center({ p: '2', borderRadius: 'xl', _hover: { bgColor: 'gray.100' }, cursor: 'pointer' })}
//                     >
//                         <ArrowLeft size={20} />
//                     </button>
//                     <h1 className={css({ fontSize: '2xl', fontWeight: '800', color: '#1A365D' })}>
//                         {mode === 'create' ? 'Crear Nuevo Remito' : 'Editar Remito'}
//                     </h1>
//                 </div>

//                 <button
//                     onClick={handleSave}
//                     className={hstack({
//                         px: '6', py: '2.5', bgColor: 'blue.600', color: 'white',
//                         borderRadius: 'xl', fontWeight: 'bold', cursor: 'pointer',
//                         _hover: { bgColor: 'blue.700' }
//                     })}
//                 >
//                     <Save size={18} /> {mode === 'create' ? 'Generar Remito' : 'Guardar Cambios'}
//                 </button>
//             </div>

//             <div className={grid({ columns: { base: 1, lg: 3 }, gap: '6' })}>

//                 {/* Columna Principal: Datos e Ítems */}
//                 <div className={css({ lg: { gridColumn: 'span 2' }, spaceY: '6' })}>

//                     {/* Card: Información General */}
//                     <div className={cardStyle}>
//                         <h3 className={sectionTitleStyle}>Información de Traslado</h3>
//                         <div className={grid({ columns: 2, gap: '4' })}>
//                             <div className={stack({ gap: '1.5' })}>
//                                 <label className={labelStyle}>Sede Destino</label>
//                                 <select className={inputStyle}>
//                                     <option>Seleccionar sede...</option>
//                                     <option>Sede Norte - Salta</option>
//                                     <option>Sede Sur - Neuquén</option>
//                                 </select>
//                             </div>
//                             <div className={stack({ gap: '1.5' })}>
//                                 <label className={labelStyle}>Fecha de Emisión</label>
//                                 <input type="date" className={inputStyle} defaultValue={new Date().toISOString().split('T')[0]} />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Card: Tabla de Ítems Dinámica */}
//                     <div className={cardStyle}>
//                         <div className={hstack({ justifyContent: 'space-between', mb: '4' })}>
//                             <h3 className={sectionTitleStyle}>Detalle de Productos</h3>
//                             <button
//                                 onClick={addItem}
//                                 className={hstack({ color: 'blue.600', fontSize: 'xs', fontWeight: 'bold', cursor: 'pointer' })}
//                             >
//                                 <Plus size={14} /> AGREGAR FILA
//                             </button>
//                         </div>

//                         <div className={stack({ gap: '3' })}>
//                             {items.map((item, index) => (
//                                 <div key={item.id} className={hstack({ gap: '3' })}>
//                                     <div className={center({
//                                         minW: '32px', h: '32px', bgColor: 'gray.50',
//                                         borderRadius: 'md', fontSize: 'xs', fontWeight: 'bold', color: 'gray.400'
//                                     })}>
//                                         {index + 1}
//                                     </div>
//                                     <input
//                                         placeholder="Descripción del producto o material..."
//                                         className={css({ flex: 1, ...inputStyleRaw })}
//                                     />
//                                     <input
//                                         type="number"
//                                         placeholder="Cant."
//                                         className={css({ w: '80px', ...inputStyleRaw })}
//                                     />
//                                     <button
//                                         onClick={() => removeItem(item.id)}
//                                         className={css({ color: 'gray.300', _hover: { color: 'red.500' }, cursor: 'pointer', p: '2' })}
//                                     >
//                                         <Trash2 size={16} />
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Columna Lateral: Resumen / Metadata */}
//                 <div className={stack({ gap: '6' })}>
//                     <div className={css({
//                         p: '6', bgColor: 'blue.50', borderRadius: '2xl', border: '1px solid', borderColor: 'blue.100'
//                     })}>
//                         <h4 className={css({ color: 'blue.800', fontWeight: 'bold', mb: '2', fontSize: 'sm' })}>Resumen de Operación</h4>
//                         <p className={css({ color: 'blue.600', fontSize: 'xs', lineHeight: 'relaxed' })}>
//                             Al confirmar, el sistema generará un número correlativo de remito y notificará a la sede destino.
//                         </p>
//                         <div className={css({ my: '4', borderTop: '1px dashed', borderColor: 'blue.200' })} />
//                         <div className={hstack({ justifyContent: 'space-between', color: 'blue.800', fontWeight: '800' })}>
//                             <span>Total Ítems:</span>
//                             <span>{items.length}</span>
//                         </div>
//                     </div>

//                     <div className={cardStyle}>
//                         <label className={labelStyle}>Observaciones Internas</label>
//                         <textarea
//                             className={css({ ...inputStyleRaw, minH: '100px', mt: '2', w: 'full', resize: 'none' })}
//                             placeholder="Notas adicionales..."
//                         />
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }

// // --- Estilos Reutilizables ---
// const cardStyle = css({ p: '6', bgColor: 'white', borderRadius: '2xl', border: '1px solid', borderColor: 'gray.100', boxShadow: 'sm' });
// const sectionTitleStyle = css({ fontWeight: '800', color: '#1A365D', mb: '4', fontSize: 'md' });
// const labelStyle = css({ fontSize: 'xs', fontWeight: 'bold', color: 'gray.500', textTransform: 'uppercase', letterSpacing: 'wider' });
// const inputStyleRaw = {
//     p: '2.5', bgColor: 'gray.50', border: '1px solid', borderColor: 'gray.200',
//     borderRadius: 'xl', fontSize: 'sm', outline: 'none', _focus: { borderColor: 'blue.400', bgColor: 'white' }
// };
// const inputStyle = css(inputStyleRaw);