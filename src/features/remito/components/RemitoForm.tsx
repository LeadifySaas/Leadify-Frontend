import { useEffect, useState } from "react";
import { useForm, useFieldArray, useWatch, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from '@tanstack/react-router';
import { Save, ArrowLeft, Plus, Trash2, Package, User, MapPin, Calendar, FileText, FileSignature, Box } from 'lucide-react';
import { toast } from 'react-toastify';
import { remitoSchema, type RemitoFormValues } from "../schemas";
import { useRemitos } from "../hooks/useRemitos";
import { useClientes } from "@/features/cliente/hooks/useClientes";
import { useSedes } from "@/features/sucursal/hooks/useSedes";
import { useArticulos } from "@/features/articulo/hooks/useArticulos";
import { ErrorModal } from "@/shared/components/ui/ErrorModal";
import { css } from '../../../../styled-system/css';
import { stack, grid, hstack, center } from '../../../../styled-system/patterns';

export function RemitoForm({ mode, initialData }: { mode: 'create' | 'edit'; initialData?: any }) {
    const navigate = useNavigate();
    const { createRemito, updateRemito, isCreating, isUpdating } = useRemitos();
    const [errorStatus, setErrorStatus] = useState({ open: false, title: "", detail: "" });

    // Queries de datos maestros
    const { clientesQuery } = useClientes(1, 1000);
    const { articulosQuery } = useArticulos(1, 1000);
    const { sedesQuery } = useSedes(1, 1000);

    const clientes = clientesQuery.data?.items || [];
    const articulos = articulosQuery.data?.items || [];
    const sedes = sedesQuery.data?.items || [];

    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<RemitoFormValues>({
        resolver: zodResolver(remitoSchema),
        defaultValues: {
            fechaEmision: new Date().toISOString().split('T')[0],
            estado: "Pendiente",
            items: [{ articuloId: 0, cantidad: 1, notas: "" }]
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "items" });

    // Observamos el clienteId para filtrar las sedes
    const selectedClienteId = useWatch({ control, name: "clienteId" });

    useEffect(() => {
        if (
            mode === 'edit' &&
            initialData &&
            clientes.length > 0 &&
            sedes.length > 0 &&
            articulos.length > 0
        ) {
            reset({
                numeroRemito: initialData.numeroRemito || "",
                fechaEmision: initialData.fechaEmision
                    ? initialData.fechaEmision.split('T')[0]
                    : "",

                clienteId: Number(initialData.cliente?.id ?? 0),
                sedeId: Number(initialData.sede?.id ?? 0),

                estado: initialData.estado || "Pendiente",
                observaciones: initialData.observaciones || "",

                items: initialData.items?.length
                    ? initialData.items.map((i: any) => ({
                        articuloId: Number(i.articuloId ?? 0),
                        cantidad: Number(i.cantidad ?? 1),
                        notas: i.notas ?? ""
                    }))
                    : [{ articuloId: 0, cantidad: 1, notas: "" }]
            });
        }
    }, [
        initialData,
        mode,
        clientes.length,
        sedes.length,
        articulos.length,
        reset
    ]);

    // Sedes filtradas por cliente
    const sedesFiltradas = sedes.filter((s: any) => Number(s.clienteId) === Number(selectedClienteId));

    const onSubmit: SubmitHandler<RemitoFormValues> = async (data) => {
        try {
            if (mode === 'create') {
                await createRemito(data);
                toast.success("Remito creado con éxito");
            } else {
                await updateRemito({
                    id: initialData.id,
                    ...data
                });
                toast.success("Remito actualizado con éxito");
            }
            navigate({ to: '/documentacion/remitos' });
        } catch (error: any) {
            setErrorStatus({
                open: true,
                title: "Error en el Servidor",
                detail: error.response?.data?.detail || "Error desconocido al procesar el remito."
            });
            toast.error("Ocurrió un error al guardar el remito.");
        }
    };

    const getFieldStyle = (hasError: any) => css(inputStyleRaw, {
        borderColor: hasError ? 'red.400!' : 'gray.200',
        _focus: { borderColor: hasError ? 'red.500!' : 'blue.400' }
    });

    return (
        <>
            <ErrorModal
                isOpen={errorStatus.open}
                title={errorStatus.title}
                description={errorStatus.detail}
                onClose={() => setErrorStatus(prev => ({ ...prev, open: false }))}
            />

            <form onSubmit={handleSubmit(onSubmit)} className={stack({ gap: '6', p: '2' })}>
                {/* Cabecera */}
                <div className={hstack({ justifyContent: 'space-between', mb: '4' })}>
                    <div className={hstack({ gap: '4' })}>
                        <button type="button" onClick={() => history.back()} className={backBtnStyle}>
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className={css({ fontSize: '2xl', fontWeight: '800', color: '#1A365D' })}>
                            {mode === 'create' ? 'Nuevo Remito' : `Editar Remito #${initialData?.numeroRemito}`}
                        </h1>
                    </div>
                    <button type="submit" disabled={isCreating || isUpdating} className={saveBtnStyle}>
                        <Save size={18} /> {isCreating || isUpdating ? 'Guardando...' : 'Guardar Remito'}
                    </button>
                </div>

                <div className={grid({ columns: { base: 1, lg: 3 }, gap: '6' })}>
                    {/* Columna Principal: Cliente/Sede e Items */}
                    <div className={css({ lg: { gridColumn: 'span 2' }, spaceY: '6' })}>
                        {/* Sección Cliente y Sede */}
                        <div className={cardStyle}>
                            <div className={hstack({ mb: '4', gap: '2' })}>
                                <User size={18} className={css({ color: 'blue.600' })} />
                                <h3 className={sectionTitleStyle}>Destino del Remito</h3>
                            </div>
                            <div className={grid({ columns: 2, gap: '4' })}>
                                <div className={stack({ gap: '1.5', gridColumn: 'span 2' })}>
                                    <label className={labelStyle}>Cliente</label>
                                    <select {...register("clienteId", { valueAsNumber: true })} className={getFieldStyle(errors.clienteId)}>
                                        <option value={0}>Seleccione un cliente...</option>
                                        {clientes.map((c: any) => <option key={c.id} value={c.id}>{c.nombre} {c.apellido} , {c.cuil}</option>)}
                                    </select>
                                    {errors.clienteId && <span className={errorStyle}>{errors.clienteId.message}</span>}
                                </div>
                                <div className={stack({ gap: '1.5', gridColumn: 'span 2' })}>
                                    <label className={labelStyle}>Sede de Destino</label>
                                    <select {...register("sedeId", { valueAsNumber: true })} className={getFieldStyle(errors.sedeId)} disabled={sedesFiltradas.length === 0}>
                                        <option value={0}>{sedesFiltradas.length > 0 ? 'Seleccione una sede...' : 'Primero seleccione un cliente'}</option>
                                        {sedesFiltradas.map((s: any) => <option key={s.id} value={s.id}>{s.nombre}</option>)}
                                    </select>
                                    {errors.sedeId && <span className={errorStyle}>{errors.sedeId.message}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Items */}
                        <div className={cardStyle}>
                            <div className={hstack({ justifyContent: 'space-between', mb: '4' })}>
                                <div className={hstack({ gap: '2' })}>
                                    <Box size={18} className={css({ color: 'orange.600' })} />
                                    <h3 className={sectionTitleStyle}>Artículos</h3>
                                </div>
                                <button type="button" onClick={() => append({ articuloId: 0, cantidad: 1, notas: "" })} className={addItemBtnStyle}>
                                    <Plus size={16} /> Agregar
                                </button>
                            </div>
                            <div className={stack({ gap: '3' })}>
                                {fields.map((field, index) => (
                                    <div key={field.id} className={itemRowStyle}>
                                        <div className={hstack({ justifyContent: 'space-between', mb: '2' })}>
                                            <span className={itemNumberStyle}>{index + 1}</span>
                                            <button type="button" onClick={() => remove(index)} className={deleteRowBtnStyle}><Trash2 size={16} /></button>
                                        </div>
                                        <div className={grid({ columns: 4, gap: '3' })}>
                                            <div className={stack({ gap: '1', gridColumn: 'span 3' })}>
                                                <select {...register(`items.${index}.articuloId` as const, { valueAsNumber: true })} className={getFieldStyle(errors.items?.[index]?.articuloId)}>
                                                    <option value={0}>Seleccione Artículo...</option>
                                                    {articulos.map((a: any) => <option key={a.id} value={a.id}>{a.nombre}</option>)}
                                                </select>
                                            </div>
                                            <div className={stack({ gap: '1' })}>
                                                <input type="number" placeholder="Cant." {...register(`items.${index}.cantidad` as const, { valueAsNumber: true })} className={getFieldStyle(errors.items?.[index]?.cantidad)} />
                                            </div>
                                            <div className={stack({ gap: '1', gridColumn: 'span 4' })}>
                                                <input placeholder="Notas del artículo (opcional)" {...register(`items.${index}.notas` as const)} className={notesInputStyle} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {errors.items && <span className={errorStyle}>{errors.items.message}</span>}
                        </div>
                    </div>

                    {/* Columna Lateral: Control y Meta */}
                    <div className={stack({ gap: '6' })}>
                        <div className={cardStyle}>
                            <div className={hstack({ mb: '4', gap: '2' })}>
                                <FileText size={18} className={css({ color: 'purple.600' })} />
                                <h3 className={sectionTitleStyle}>Datos de Control</h3>
                            </div>
                            <div className={stack({ gap: '4' })}>
                                <div className={stack({ gap: '1.5' })}>
                                    <label className={labelStyle}>Número de Remito</label>
                                    <input placeholder="Ej: R0001-00123" {...register("numeroRemito")} className={getFieldStyle(errors.numeroRemito)} />
                                    {errors.numeroRemito && <span className={errorStyle}>{errors.numeroRemito.message}</span>}
                                </div>
                                <div className={stack({ gap: '1.5' })}>
                                    <label className={labelStyle}>Fecha de Emisión</label>
                                    <input type="date" {...register("fechaEmision")} className={getFieldStyle(errors.fechaEmision)} />
                                    {errors.fechaEmision && <span className={errorStyle}>{errors.fechaEmision.message}</span>}
                                </div>
                            </div>
                        </div>

                        <div className={cardStyle}>
                            <div className={hstack({ mb: '4', gap: '2' })}>
                                <FileSignature size={18} className={css({ color: 'green.600' })} />
                                <h3 className={sectionTitleStyle}>Observaciones</h3>
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <textarea rows={4} placeholder="Notas generales del remito..." {...register("observaciones")} className={getFieldStyle(errors.observaciones)}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

// --- ESTILOS PANDA CSS ---

const cardStyle = css({ p: '6', bgColor: 'white', borderRadius: '2xl', border: '1px solid', borderColor: 'gray.100', boxShadow: 'sm' });
const inputStyleRaw = { p: '2.5', bgColor: 'gray.50', border: '1px solid', borderColor: 'gray.200', borderRadius: 'xl', fontSize: 'sm', w: 'full', outline: 'none', transition: 'all 0.2s', _focus: { borderColor: 'blue.400', bgColor: 'white', boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)' }, _disabled: { bgColor: 'gray.100', color: 'gray.400', cursor: 'not-allowed' } };
const labelStyle = css({ fontSize: 'xs', fontWeight: 'bold', color: 'gray.500', textTransform: 'uppercase' });
const sectionTitleStyle = css({ fontWeight: '800', color: '#1A365D', fontSize: 'md' });
const errorStyle = css({ color: 'red.500', fontSize: '10px', fontWeight: 'bold', mt: '1' });

const saveBtnStyle = hstack({ px: '6', py: '2.5', bgColor: 'blue.600', color: 'white', borderRadius: 'xl', fontWeight: 'bold', cursor: 'pointer', shadow: 'sm', transition: 'transform 0.1s, background-color 0.2s', _hover: { bgColor: 'blue.700', transform: 'translateY(-1px)' }, _active: { transform: 'translateY(0)' }, _disabled: { opacity: 0.5, cursor: 'not-allowed' } });
const backBtnStyle = center({ p: '2', borderRadius: 'xl', bgColor: 'white', _hover: { bgColor: 'gray.100' }, cursor: 'pointer' });
const addItemBtnStyle = hstack({ px: '4', py: '2', bgColor: 'white', border: '1px solid', borderColor: 'gray.200', color: 'blue.600', borderRadius: 'xl', fontSize: 'xs', fontWeight: 'bold', cursor: 'pointer', _hover: { bgColor: 'blue.50', borderColor: 'blue.200' } });

const itemRowStyle = css({ p: '4', bgColor: 'white', borderRadius: 'xl', border: '1px solid', borderColor: 'gray.200' });
const itemNumberStyle = center({ w: '6', h: '6', bgColor: 'gray.100', borderRadius: 'full', fontSize: '10px', fontWeight: 'bold', color: 'gray.500' });
const deleteRowBtnStyle = center({ color: 'gray.400', transition: 'colors 0.2s', p: '1', borderRadius: 'md', _hover: { color: 'red.500', bgColor: 'red.50' }, cursor: 'pointer' });
const notesInputStyle = css({ ...inputStyleRaw, bgColor: 'transparent', border: 'none', borderBottom: '1px dashed', borderColor: 'gray.300', borderRadius: '0', px: '1', fontSize: 'xs', _focus: { borderColor: 'blue.400', boxShadow: 'none', bgColor: 'transparent' } });