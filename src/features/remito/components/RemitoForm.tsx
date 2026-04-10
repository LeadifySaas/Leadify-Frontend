import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from '@tanstack/react-router';
import { Save, ArrowLeft, Plus, Trash2, Package } from 'lucide-react';
import { remitoSchema, type RemitoFormValues } from "../schemas";
import { css } from '../../../../styled-system/css';
import { stack, grid, hstack, center } from '../../../../styled-system/patterns';

export function RemitoForm({ mode, initialData }: { mode: 'create' | 'edit', initialData?: any }) {
    const navigate = useNavigate();

    const { register, control, handleSubmit, formState: { errors } } = useForm<RemitoFormValues>({
        resolver: zodResolver(remitoSchema),
        defaultValues: initialData || {
            fechaEmision: new Date().toISOString().split('T')[0],
            items: [{ articuloId: 0, cantidad: 1, notas: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });

    const onSubmit = (data: RemitoFormValues) => {
        console.log("Enviando a .NET:", data);
        // Aquí va tu mutate()
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={stack({ gap: '6', p: '2' })}>
            {/* Header igual al de Artículos/Clientes para consistencia */}
            <div className={hstack({ justifyContent: 'space-between' })}>
                <div className={hstack({ gap: '4' })}>
                    <button type="button" onClick={() => navigate({ to: '/documentacion/remitos' })} className={backBtnStyle}>
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className={css({ fontSize: '2xl', fontWeight: '800', color: '#1A365D' })}>
                        {mode === 'create' ? 'Nuevo Remito' : 'Editar Remito'}
                    </h1>
                </div>
                <button type="submit" className={saveBtnStyle}>
                    <Save size={18} /> {mode === 'create' ? 'Generar Remito' : 'Guardar Cambios'}
                </button>
            </div>

            <div className={grid({ columns: { base: 1, lg: 3 }, gap: '6' })}>
                <div className={css({ lg: { gridColumn: 'span 2' }, spaceY: '6' })}>

                    {/* INFO CABECERA */}
                    <div className={cardStyle}>
                        <h3 className={sectionTitleStyle}>Datos de Cabecera</h3>
                        <div className={grid({ columns: 2, gap: '4' })}>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Punto de Venta / Número</label>
                                <input {...register("numeroRemito")} className={inputStyle} placeholder="0001-00000123" />
                                {errors.numeroRemito && <span className={errorStyle}>{errors.numeroRemito.message}</span>}
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Fecha de Emisión</label>
                                <input type="date" {...register("fechaEmision")} className={inputStyle} />
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Cliente</label>
                                <select {...register("clienteId", { valueAsNumber: true })} className={inputStyle}>
                                    <option value="">Seleccione Cliente...</option>
                                    {/* Aquí mapearías tus clientes */}
                                </select>
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Sede Destino</label>
                                <select {...register("sedeId", { valueAsNumber: true })} className={inputStyle}>
                                    <option value="">Seleccione Sede...</option>
                                    {/* Aquí mapearías tus sedes */}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* DETALLE DE ITEMS */}
                    <div className={cardStyle}>
                        <div className={hstack({ justifyContent: 'space-between', mb: '4' })}>
                            <h3 className={sectionTitleStyle}>Detalle de Productos</h3>
                            <button type="button" onClick={() => append({ articuloId: 0, cantidad: 1, precioUnitario: 0, notas: "" })} className={addItemBtnStyle}>
                                <Plus size={14} /> AGREGAR FILA
                            </button>
                        </div>

                        <div className={stack({ gap: '3' })}>
                            {fields.map((field, index) => (
                                <div key={field.id} className={hstack({ gap: '3', alignItems: 'flex-start' })}>
                                    <div className={itemNumberStyle}>{index + 1}</div>
                                    <div className={css({ flex: 2 })}>
                                        <select {...register(`items.${index}.articuloId` as const, { valueAsNumber: true })} className={inputStyle}>
                                            <option value="">Seleccionar Artículo...</option>
                                        </select>
                                    </div>
                                    <div className={css({ flex: 1 })}>
                                        <input type="number" step="0.01" {...register(`items.${index}.cantidad` as const, { valueAsNumber: true })} className={inputStyle} placeholder="Cant." />
                                    </div>
                                    <div className={css({ flex: 2 })}>
                                        <input {...register(`items.${index}.notas` as const)} className={inputStyle} placeholder="Notas por ítem..." />
                                    </div>
                                    <button type="button" onClick={() => remove(index)} className={deleteRowBtnStyle}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BARRA LATERAL */}
                <div className={stack({ gap: '6' })}>
                    <div className={resumenCardStyle}>
                        <h4 className={css({ fontWeight: 'bold', mb: '2', fontSize: 'sm' })}>Acciones Rápidas</h4>
                        <p className={css({ fontSize: 'xs', opacity: 0.8 })}>
                            Total de líneas: <strong>{fields.length}</strong>
                        </p>
                    </div>
                    <div className={cardStyle}>
                        <label className={labelStyle}>Observaciones Generales</label>
                        <textarea {...register("observaciones")} className={css({ ...inputStyleRaw, minH: '120px', mt: '2', w: 'full', resize: 'none' })} placeholder="Escriba aquí notas relevantes del traslado..." />
                    </div>
                </div>
            </div>
        </form>
    );
}

// Estilos Panda (Asegurate de que coincidan con tu proyecto)
const cardStyle = css({ p: '6', bgColor: 'white', borderRadius: '2xl', border: '1px solid', borderColor: 'gray.100', boxShadow: 'sm' });
const inputStyleRaw = { p: '2.5', bgColor: 'gray.50', border: '1px solid', borderColor: 'gray.200', borderRadius: 'xl', fontSize: 'sm', outline: 'none', _focus: { borderColor: 'blue.400', bgColor: 'white' } };
const inputStyle = css(inputStyleRaw);
const labelStyle = css({ fontSize: 'xs', fontWeight: 'bold', color: 'gray.500', textTransform: 'uppercase' });
const sectionTitleStyle = css({ fontWeight: '800', color: '#1A365D', mb: '4', fontSize: 'md' });
const errorStyle = css({ color: 'red.500', fontSize: '10px', fontWeight: 'bold' });
const saveBtnStyle = hstack({ px: '6', py: '2.5', bgColor: 'blue.600', color: 'white', borderRadius: 'xl', fontWeight: 'bold', cursor: 'pointer', _hover: { bgColor: 'blue.700' } });
const backBtnStyle = center({ p: '2', borderRadius: 'xl', _hover: { bgColor: 'gray.100' }, cursor: 'pointer' });
const addItemBtnStyle = hstack({ color: 'blue.600', fontSize: 'xs', fontWeight: 'bold', cursor: 'pointer' });
const itemNumberStyle = center({ minW: '32px', h: '32px', bgColor: 'gray.50', borderRadius: 'md', fontSize: 'xs', fontWeight: 'bold', color: 'gray.400', mt: '1' });
const deleteRowBtnStyle = css({ color: 'gray.300', _hover: { color: 'red.500' }, cursor: 'pointer', p: '2', mt: '1' });
const resumenCardStyle = css({ p: '6', bgColor: 'blue.600', color: 'white', borderRadius: '2xl', boxShadow: 'lg' });