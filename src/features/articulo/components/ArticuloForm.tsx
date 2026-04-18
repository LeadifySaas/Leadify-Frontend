import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from '@tanstack/react-router';
import { Save, ArrowLeft, Package, BadgeDollarSign, Settings2 } from 'lucide-react';
import { articuloSchema, type ArticuloFormValues } from "../schemas";
import { useArticulos } from "../hooks/useArticulos";
import { css } from '@/styled-system/css';
import { stack, grid, hstack, center } from '@/styled-system/patterns';

interface Props {
    mode: 'create' | 'edit';
    initialData?: any;
}

export function ArticuloForm({ mode, initialData }: Props) {
    const navigate = useNavigate();
    const { createArticulo, updateArticulo, isCreating, isUpdating } = useArticulos();

    const {
        register,
        handleSubmit,
        watch,
        setError,
        reset,
        formState: { errors }
    } = useForm<ArticuloFormValues>({
        resolver: zodResolver(articuloSchema),
        defaultValues: initialData || {
            unidadMedida: "Unidades",
            activo: true,
            precioVenta: 0,
            stockActual: 0,
            descripcion: ""
        },
    });

    // Resetear el formulario cuando llegan datos de edición (importante para el Edit)
    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    const onSubmit = async (data: ArticuloFormValues) => {
        try {
            if (mode === 'create') {
                await createArticulo(data);
            } else {
                await updateArticulo({ id: initialData.id, ...data });
            }
            navigate({ to: '/materiales/articulos' });
        } catch (error: any) {
            // Capturamos el error 400 del Backend (Código duplicado)
            if (error.response?.status === 400 && error.response.data.includes("ya existe")) {
                setError("codigo", {
                    type: "manual",
                    message: "Este código de artículo ya está en uso"
                });
            } else {
                alert("Ocurrió un error al guardar el artículo.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={stack({ gap: '6', p: '2' })}>

            {/* Header: Título y Botón Guardar */}
            <div className={hstack({ justifyContent: 'space-between' })}>
                <div className={hstack({ gap: '4' })}>
                    <button
                        type="button"
                        onClick={() => navigate({ to: '/materiales/articulos' })}
                        className={center({ p: '2', borderRadius: 'xl', _hover: { bgColor: 'gray.100' }, cursor: 'pointer' })}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className={css({ fontSize: '2xl', fontWeight: '800', color: '#1A365D' })}>
                        {mode === 'create' ? 'Nuevo Artículo' : 'Editar Artículo'}
                    </h1>
                </div>
                <button type="submit" disabled={isCreating || isUpdating} className={saveBtnStyle}>
                    <Save size={18} /> {isCreating || isUpdating ? 'Guardando...' : 'Guardar Artículo'}
                </button>
            </div>

            <div className={grid({ columns: { base: 1, lg: 3 }, gap: '6' })}>

                {/* Columna Principal (Datos e Info) */}
                <div className={css({ lg: { gridColumn: 'span 2' }, spaceY: '6' })}>

                    {/* Card: Información General */}
                    <div className={cardStyle}>
                        <div className={hstack({ mb: '4', gap: '2' })}>
                            <Package size={18} className={css({ color: 'blue.600' })} />
                            <h3 className={sectionTitleStyle}>Información del Producto</h3>
                        </div>
                        <div className={grid({ columns: 2, gap: '4' })}>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Código (SKU)</label>
                                <input
                                    {...register("codigo")}
                                    className={inputStyle}
                                    placeholder="Ej: ART-001"
                                    disabled={mode === 'edit'}
                                />
                                {errors.codigo && <span className={errorStyle}>{errors.codigo.message}</span>}
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Nombre</label>
                                <input
                                    {...register("nombre")}
                                    className={inputStyle}
                                    placeholder="Nombre del artículo"
                                />
                                {errors.nombre && <span className={errorStyle}>{errors.nombre.message}</span>}
                            </div>

                            {/* Campo Descripción */}
                            <div className={stack({ gap: '1.5', gridColumn: 'span 2' })}>
                                <label className={labelStyle}>Descripción</label>
                                <textarea
                                    {...register("descripcion")}
                                    className={inputStyle}
                                    placeholder="Detalles técnicos, medidas, marcas..."
                                    rows={3}
                                    style={{ resize: 'none' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Card: Precios y Stock */}
                    <div className={cardStyle}>
                        <div className={hstack({ mb: '4', gap: '2' })}>
                            <BadgeDollarSign size={18} className={css({ color: 'green.600' })} />
                            <h3 className={sectionTitleStyle}>Valores y Stock</h3>
                        </div>
                        <div className={grid({ columns: 3, gap: '4' })}>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Precio Venta</label>
                                <input type="number" step="0.01" {...register("precioVenta", { valueAsNumber: true })} className={inputStyle} />
                                {errors.precioVenta && <span className={errorStyle}>{errors.precioVenta.message}</span>}
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Stock Actual</label>
                                <input type="number" {...register("stockActual", { valueAsNumber: true })} className={inputStyle} />
                                {errors.stockActual && <span className={errorStyle}>{errors.stockActual.message}</span>}
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Unidad de Medida</label>
                                <select {...register("unidadMedida")} className={inputStyle}>
                                    <option value="Unidades">Unidades</option>
                                    <option value="Metros">Metros</option>
                                    <option value="Kilos">Kilos</option>
                                    <option value="Litros">Litros</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna Lateral (Configuraciones) */}
                <div className={stack({ gap: '6' })}>
                    <div className={cardStyle}>
                        <div className={hstack({ mb: '4', gap: '2' })}>
                            <Settings2 size={18} className={css({ color: 'gray.600' })} />
                            <h3 className={sectionTitleStyle}>Configuración</h3>
                        </div>

                        <div className={hstack({ justifyContent: 'space-between', p: '2' })}>
                            <span className={css({ fontSize: 'sm', fontWeight: '600', color: 'gray.700' })}>
                                Artículo Activo
                            </span>

                            <label className={toggleContainer}>
                                <input
                                    type="checkbox"
                                    {...register("activo")}
                                    className={toggleInput}
                                />
                                <span className={toggleSlider} />
                            </label>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    );
}

// --- Estilos Panda CSS ---
const cardStyle = css({ p: '6', bgColor: 'white', borderRadius: '2xl', border: '1px solid', borderColor: 'gray.100', boxShadow: 'sm' });
const sectionTitleStyle = css({ fontWeight: '800', color: '#1A365D', fontSize: 'md' });
const labelStyle = css({ fontSize: 'xs', fontWeight: 'bold', color: 'gray.500', textTransform: 'uppercase' });
const inputStyle = css({ p: '2.5', bgColor: 'gray.50', border: '1px solid', borderColor: 'gray.200', borderRadius: 'xl', fontSize: 'sm', w: 'full', outline: 'none', _focus: { borderColor: 'blue.400', bgColor: 'white' } });
const errorStyle = css({ color: 'red.500', fontSize: '10px', fontWeight: 'bold' });
const saveBtnStyle = hstack({ px: '6', py: '2.5', bgColor: 'blue.600', color: 'white', borderRadius: 'xl', fontWeight: 'bold', cursor: 'pointer', _hover: { bgColor: 'blue.700' }, _disabled: { opacity: 0.6, cursor: 'not-allowed' } });

// Toggle Styles
const toggleContainer = css({ position: 'relative', display: 'inline-block', w: '44px', h: '24px', cursor: 'pointer' });
const toggleInput = css({ opacity: 0, w: 0, h: 0, _checked: { '& + span': { bgColor: 'blue.600', _before: { transform: 'translateX(20px)' } } } });
const toggleSlider = css({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, bgColor: 'gray.300', borderRadius: 'full', transition: '0.3s', _before: { content: '""', position: 'absolute', h: '18px', w: '18px', left: '3px', bottom: '3px', bgColor: 'white', borderRadius: 'full', transition: '0.3s', boxShadow: 'sm' } });