import { css } from '../../../../styled-system/css';
import { stack, grid, hstack, center } from '../../../../styled-system/patterns';
import { Save, ArrowLeft, User, ShieldCheck, Info } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { clienteSchema, type ClienteFormValues } from "../schemas";
import { useClientes } from "../hooks/useClientes";

interface Props {
    mode: 'create' | 'edit';
    initialData?: any;
}

export function ClienteForm({ mode, initialData }: Props) {
    const navigate = useNavigate();
    const { createCliente, updateCliente, isCreating, isUpdating } = useClientes();

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<ClienteFormValues>({
        resolver: zodResolver(clienteSchema),
        defaultValues: initialData || {
            condicionIVA: "Responsable Inscripto",
            activo: true,
        },
    });

    // Re-sincroniza el formulario cuando llegan datos frescos del backend.
    // defaultValues solo se lee una vez al montar; reset() es la forma correcta
    // de actualizar el formulario cuando initialData cambia (ej: caché stale → dato nuevo).
    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    const onSubmit: SubmitHandler<ClienteFormValues> = async (data) => {
        try {
            if (mode === 'create') {
                await createCliente(data);
            } else {
                await updateCliente({ id: initialData.id, ...data });
            }
            navigate({ to: '/administracion/clientes' });
        } catch (error) {
            console.error("Error", error);
        }
    };

    const currentName = watch("razonSocial");
    const currentCuit = watch("cuit");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={stack({ gap: '6', p: '2' })}>

            {/* Header del Formulario */}
            <div className={hstack({ justifyContent: 'space-between' })}>
                <div className={hstack({ gap: '4' })}>
                    <button
                        type="button"
                        onClick={() => navigate({ to: '/administracion/clientes' })}
                        className={center({ p: '2', borderRadius: 'xl', _hover: { bgColor: 'gray.100' }, cursor: 'pointer' })}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className={css({ fontSize: '2xl', fontWeight: '800', color: '#1A365D' })}>
                        {mode === 'create' ? 'Registrar Nuevo Cliente' : 'Editar Cliente'}
                    </h1>
                </div>

                <button
                    type="submit"
                    disabled={isCreating}
                    className={hstack({
                        px: '6', py: '2.5', bgColor: 'blue.600', color: 'white',
                        borderRadius: 'xl', fontWeight: 'bold', cursor: 'pointer',
                        _hover: { bgColor: 'blue.700' },
                        opacity: isCreating ? 0.7 : 1
                    })}
                >
                    <Save size={18} /> {isCreating ? 'Guardando...' : (mode === 'create' ? 'Crear Cliente' : 'Guardar Cambios')}
                </button>
            </div>

            <div className={grid({ columns: { base: 1, lg: 3 }, gap: '6' })}>

                {/* Columna Principal: Datos Fiscales y Contacto */}
                <div className={css({ lg: { gridColumn: 'span 2' }, spaceY: '6' })}>

                    {/* Card: Datos Fiscales */}
                    <div className={cardStyle}>
                        <div className={hstack({ mb: '4', gap: '2' })}>
                            <ShieldCheck size={18} className={css({ color: 'blue.600' })} />
                            <h3 className={sectionTitleStyle}>Información Fiscal</h3>
                        </div>
                        <div className={grid({ columns: 2, gap: '4' })}>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Razón Social</label>
                                <input
                                    {...register("razonSocial")}
                                    className={inputStyle}
                                    placeholder="Nombre legal de la empresa"
                                />
                                {errors.razonSocial && <span className={errorStyle}>{errors.razonSocial.message}</span>}
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>CUIT</label>
                                <input
                                    {...register("cuit")}
                                    className={inputStyle}
                                    placeholder="30-XXXXXXXX-X"
                                />
                                {errors.cuit && <span className={errorStyle}>{errors.cuit.message}</span>}
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Condición IVA</label>
                                <select
                                    className={inputStyle}
                                    {...register("condicionIVA")}
                                >
                                    <option value="Responsable Inscripto">Responsable Inscripto</option>
                                    <option value="Monotributista">Monotributista</option>
                                    <option value="Exento">Exento</option>
                                    <option value="Consumidor Final">Consumidor Final</option>
                                </select>
                            </div>
                            {/* Toggle de Estado Activo */}
                            <div className={stack({ gap: '1.5', justifyContent: 'center' })}>
                                <label className={labelStyle}>Estado del Cliente</label>
                                <label className={hstack({
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                    gap: '3',
                                    p: '2',
                                    borderRadius: 'xl',
                                    border: '1px solid',
                                    borderColor: 'gray.200',
                                    bgColor: 'gray.50',
                                    transition: 'all 0.2s',
                                    _hover: { borderColor: 'blue.200' }
                                })}>
                                    <div className={css({ position: 'relative', display: 'inline-block', w: '10', h: '6' })}>
                                        <input
                                            type="checkbox"
                                            {...register("activo")}
                                            className={css({
                                                opacity: 0, w: 0, h: 0,
                                                '&:checked + span': { bgColor: 'green.500' },
                                                '&:checked + span:before': { transform: 'translateX(16px)' }
                                            })}
                                        />
                                        <span className={css({
                                            position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                                            bgColor: 'gray.300', transition: '0.4s', borderRadius: 'full',
                                            _before: {
                                                position: 'absolute', content: '""', h: '4', w: '4', left: '1', bottom: '1',
                                                bgColor: 'white', transition: '0.4s', borderRadius: 'full'
                                            }
                                        })}></span>
                                    </div>
                                    <span className={css({ fontSize: 'sm', fontWeight: '600', color: watch("activo") ? 'green.600' : 'gray.500' })}>
                                        {watch("activo") ? 'Activo' : 'Inactivo'}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Card: Contacto */}
                    <div className={cardStyle}>
                        <div className={hstack({ mb: '4', gap: '2' })}>
                            <User size={18} className={css({ color: 'blue.600' })} />
                            <h3 className={sectionTitleStyle}>Datos de Contacto</h3>
                        </div>
                        <div className={grid({ columns: 2, gap: '4' })}>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Email Principal</label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    className={inputStyle}
                                    placeholder="administracion@empresa.com"
                                />
                                {errors.email && <span className={errorStyle}>{errors.email.message}</span>}
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Teléfono / Celular</label>
                                <input
                                    {...register("telefono")}
                                    className={inputStyle}
                                    placeholder="+54 9..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna Lateral: Resumen */}
                <div className={stack({ gap: '6' })}>
                    <div className={css({
                        p: '6', bgColor: 'blue.50', borderRadius: '2xl', border: '1px solid', borderColor: 'blue.100'
                    })}>
                        <h4 className={css({ color: 'blue.800', fontWeight: 'bold', mb: '2', fontSize: 'sm' })}>Vista Previa</h4>
                        <div className={stack({ gap: '1' })}>
                            <p className={css({ color: 'blue.900', fontSize: 'md', fontWeight: '700' })}>
                                {currentName || 'Nombre del Cliente'}
                            </p>
                            <p className={css({ color: 'blue.600', fontSize: 'xs' })}>
                                {currentCuit || 'CUIT no definido'}
                            </p>
                        </div>

                        <div className={css({ my: '4', borderTop: '1px dashed', borderColor: 'blue.200' })} />

                        <div className={hstack({ gap: '2', color: 'blue.700' })}>
                            <Info size={14} />
                            <span className={css({ fontSize: 'xs', fontWeight: '600' })}>Leadify ID System</span>
                        </div>
                    </div>

                    <div className={cardStyle}>
                        <label className={labelStyle}>Notas del Cliente</label>
                        <textarea
                            className={css({ ...inputStyleRaw, minH: '120px', mt: '2', w: 'full', resize: 'none' })}
                            placeholder="Horarios de entrega, personas de contacto secundarias, etc..."
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

// --- Estilos Reutilizables (Idénticos a tu Remito) ---
const cardStyle = css({ p: '6', bgColor: 'white', borderRadius: '2xl', border: '1px solid', borderColor: 'gray.100', boxShadow: 'sm' });
const sectionTitleStyle = css({ fontWeight: '800', color: '#1A365D', fontSize: 'md' });
const labelStyle = css({ fontSize: 'xs', fontWeight: 'bold', color: 'gray.500', textTransform: 'uppercase', letterSpacing: 'wider' });
const errorStyle = css({ color: 'red.500', fontSize: '10px', fontWeight: 'bold' });
const inputStyleRaw = {
    p: '2.5', bgColor: 'gray.50', border: '1px solid', borderColor: 'gray.200',
    borderRadius: 'xl', fontSize: 'sm', outline: 'none', _focus: { borderColor: 'blue.400', bgColor: 'white' }
};
const inputStyle = css(inputStyleRaw);