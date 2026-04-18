import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from '@tanstack/react-router';
import { Save, ArrowLeft, MapPin, Phone, User, Settings2, Globe } from 'lucide-react';
import { sedeSchema, type SedeFormValues } from "../schemas";
import { useSedes } from "../hooks/useSedes";
import { useClientes } from "../../cliente/hooks/useClientes";
import { css } from '@/styled-system/css';
import { stack, grid, hstack, center } from '@/styled-system/patterns';

interface Props {
    mode: 'create' | 'edit';
    initialData?: any;
}

export function SedeForm({ mode, initialData }: Props) {
    const navigate = useNavigate();
    const { createSede, updateSede, isCreating, isUpdating } = useSedes();
    const { clientesQuery } = useClientes(); // Hook para el dropdown de clientes

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<SedeFormValues>({
        resolver: zodResolver(sedeSchema),
        defaultValues: initialData || {
            clienteId: 0,
            activo: true,
            nombre: "",
            direccion: "",
            localidad: "",
            provincia: "",
            codigoPostal: "",
            contactoNombre: "",
            contactoTelefono: ""
        },
    });

    useEffect(() => {
        if (initialData) reset(initialData);
    }, [initialData, reset]);

    const onSubmit: SubmitHandler<SedeFormValues> = async (data) => {
        try {
            if (mode === 'create') {
                await createSede(data);
            } else {
                await updateSede({ id: initialData.id, ...data });
            }
            navigate({ to: '/administracion/sucursales' });
        } catch (error: any) {
            alert("Ocurrió un error al guardar la sede.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={stack({ gap: '6', p: '2' })}>
            {/* Header */}
            <div className={hstack({ justifyContent: 'space-between' })}>
                <div className={hstack({ gap: '4' })}>
                    <button type="button" onClick={() => history.back()} className={backBtnStyle}>
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className={css({ fontSize: '2xl', fontWeight: '800', color: '#1A365D' })}>
                        {mode === 'create' ? 'Nueva Sede / Sucursal' : 'Editar Sede'}
                    </h1>
                </div>
                <button type="submit" disabled={isCreating || isUpdating} className={saveBtnStyle}>
                    <Save size={18} /> {isCreating || isUpdating ? 'Guardando...' : 'Guardar Sede'}
                </button>
            </div>

            <div className={grid({ columns: { base: 1, lg: 3 }, gap: '6' })}>
                {/* Columna Principal */}
                <div className={css({ lg: { gridColumn: 'span 2' }, spaceY: '6' })}>

                    {/* Ubicación y Nombre */}
                    <div className={cardStyle}>
                        <div className={hstack({ mb: '4', gap: '2' })}>
                            <MapPin size={18} className={css({ color: 'blue.600' })} />
                            <h3 className={sectionTitleStyle}>Detalles de Ubicación</h3>
                        </div>
                        <div className={grid({ columns: 2, gap: '4' })}>
                            <div className={stack({ gap: '1.5', gridColumn: 'span 2' })}>
                                <label className={labelStyle}>Cliente Asociado</label>
                                <select {...register("clienteId", { valueAsNumber: true })} className={inputStyle}>
                                    <option value={0}>Seleccionar Cliente...</option>
                                    {/* Agregamos .items antes del .map */}
                                    {clientesQuery.data?.items?.map((c: any) => (
                                        <option key={c.id} value={c.id}>
                                            {c.razonSocial || c.nombre}
                                        </option>
                                    ))}
                                </select>
                                {errors.clienteId && <span className={errorStyle}>{errors.clienteId.message}</span>}
                            </div>
                            <div className={stack({ gap: '1.5', gridColumn: 'span 2' })}>
                                <label className={labelStyle}>Nombre de la Sede (ej: Depósito Sur)</label>
                                <input {...register("nombre")} className={inputStyle} placeholder="Nombre identificador" />
                                {errors.nombre && <span className={errorStyle}>{errors.nombre.message}</span>}
                            </div>
                            <div className={stack({ gap: '1.5', gridColumn: 'span 2' })}>
                                <label className={labelStyle}>Dirección</label>
                                <input {...register("direccion")} className={inputStyle} placeholder="Calle y número" />
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Localidad</label>
                                <input {...register("localidad")} className={inputStyle} />
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Código Postal</label>
                                <input {...register("codigoPostal")} className={inputStyle} />
                            </div>
                        </div>
                    </div>

                    {/* Contacto */}
                    <div className={cardStyle}>
                        <div className={hstack({ mb: '4', gap: '2' })}>
                            <User size={18} className={css({ color: 'orange.600' })} />
                            <h3 className={sectionTitleStyle}>Persona de Contacto</h3>
                        </div>
                        <div className={grid({ columns: 2, gap: '4' })}>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Nombre de Contacto</label>
                                <input {...register("contactoNombre")} className={inputStyle} placeholder="Quien recibe" />
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Teléfono</label>
                                <div className={hstack({ position: 'relative', w: 'full' })}>
                                    <Phone size={14} className={css({ position: 'absolute', left: '3', color: 'gray.400' })} />
                                    <input {...register("contactoTelefono")} className={`${inputStyle} ${css({ pl: '9' })}`} placeholder="Cod. Área + Número" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna Lateral */}
                <div className={stack({ gap: '6' })}>
                    <div className={cardStyle}>
                        <div className={hstack({ mb: '4', gap: '2' })}>
                            <Globe size={18} className={css({ color: 'purple.600' })} />
                            <h3 className={sectionTitleStyle}>Región</h3>
                        </div>
                        <div className={stack({ gap: '1.5' })}>
                            <label className={labelStyle}>Provincia</label>
                            <input {...register("provincia")} className={inputStyle} placeholder="Ej: Buenos Aires" />
                        </div>
                    </div>

                    <div className={cardStyle}>
                        <div className={hstack({ mb: '4', gap: '2' })}>
                            <Settings2 size={18} className={css({ color: 'gray.600' })} />
                            <h3 className={sectionTitleStyle}>Estado</h3>
                        </div>
                        <div className={hstack({ justifyContent: 'space-between', p: '2' })}>
                            <span className={css({ fontSize: 'sm', fontWeight: '600', color: 'gray.700' })}>Sede Activa</span>
                            <label className={toggleContainer}>
                                <input type="checkbox" {...register("activo")} className={toggleInput} />
                                <span className={toggleSlider} />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

// --- Reutilizamos tus estilos de Panda ---
const cardStyle = css({ p: '6', bgColor: 'white', borderRadius: '2xl', border: '1px solid', borderColor: 'gray.100', boxShadow: 'sm' });
const sectionTitleStyle = css({ fontWeight: '800', color: '#1A365D', fontSize: 'md' });
const labelStyle = css({ fontSize: 'xs', fontWeight: 'bold', color: 'gray.500', textTransform: 'uppercase' });
const inputStyle = css({ p: '2.5', bgColor: 'gray.50', border: '1px solid', borderColor: 'gray.200', borderRadius: 'xl', fontSize: 'sm', w: 'full', outline: 'none', _focus: { borderColor: 'blue.400', bgColor: 'white' } });
const errorStyle = css({ color: 'red.500', fontSize: '10px', fontWeight: 'bold' });
const saveBtnStyle = hstack({ px: '6', py: '2.5', bgColor: 'blue.600', color: 'white', borderRadius: 'xl', fontWeight: 'bold', cursor: 'pointer', _hover: { bgColor: 'blue.700' } });
const backBtnStyle = center({ p: '2', borderRadius: 'xl', _hover: { bgColor: 'gray.100' }, cursor: 'pointer' });

// Toggle Styles (los mismos que pasaste)
const toggleContainer = css({ position: 'relative', display: 'inline-block', w: '44px', h: '24px', cursor: 'pointer' });
const toggleInput = css({ opacity: 0, w: 0, h: 0, _checked: { '& + span': { bgColor: 'blue.600', _before: { transform: 'translateX(20px)' } } } });
const toggleSlider = css({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, bgColor: 'gray.300', borderRadius: 'full', transition: '0.3s', _before: { content: '""', position: 'absolute', h: '18px', w: '18px', left: '3px', bottom: '3px', bgColor: 'white', borderRadius: 'full', transition: '0.3s' } });