import { css } from '../../../../styled-system/css';
import { stack, grid, hstack, center } from '../../../../styled-system/patterns';
import { Save, ArrowLeft, User, ShieldCheck, Info, MapPin, Wallet } from 'lucide-react';
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
    const { createCliente, updateCliente, isCreating } = useClientes();
    const formatCUIL = (value: string) => {
        // Limpia todo lo que no sea número
        const digits = value.replace(/\D/g, "");
        
        // Aplica la máscara 00-00000000-0
        if (digits.length <= 2) return digits;
        if (digits.length <= 10) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
        return `${digits.slice(0, 2)}-${digits.slice(2, 10)}-${digits.slice(10, 11)}`;
    };

    const { register,setValue, handleSubmit, watch, reset, formState: { errors } } = useForm<ClienteFormValues>({
        resolver: zodResolver(clienteSchema),
        defaultValues: initialData || {
            condicionIVA: "Responsable Inscripto",
            activo: true,
            limiteCredito: 0
        },
    });

    useEffect(() => {
    if (initialData) {
        console.log("Datos recibidos del backend:", initialData);

        const formattedData = {
            ...initialData,
            // Limpieza de nulos para que Zod no chille
            codigoPostal: initialData.codigoPostal ?? "",
            direccion: initialData.direccion ?? "",
            localidad: initialData.localidad ?? "",
            provincia: initialData.provincia ?? "",
            email: initialData.email ?? "",
            telefono: initialData.telefono ?? "",
            dni: initialData.dni ?? "",
            observaciones: initialData.observaciones ?? "",
            
            // Formateo de fecha para el input type="date"
            fechaNacimiento: initialData.fechaNacimiento 
                ? initialData.fechaNacimiento.split('T')[0] 
                : ""
        };

        reset(formattedData);
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

    const watchNombre = watch("nombre");
    const watchApellido = watch("apellido");
    const watchCuil = watch("cuil");

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

                {/* Columna Principal */}
                <div className={css({ lg: { gridColumn: 'span 2' }, spaceY: '6' })}>

                    {/* Card: Datos Fiscales e Identificatorios */}
                    <div className={cardStyle}>
                        <div className={hstack({ mb: '4', gap: '2' })}>
                            <ShieldCheck size={18} className={css({ color: 'blue.600' })} />
                            <h3 className={sectionTitleStyle}>Información Fiscal e Identidad</h3>
                        </div>
                        <div className={grid({ columns: 2, gap: '4' })}>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Nombre</label>
                                <input {...register("nombre")} className={inputStyle} placeholder="Ej: Juan" />
                                {errors.nombre && <span className={errorStyle}>{errors.nombre.message}</span>}
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Apellido</label>
                                <input {...register("apellido")} className={inputStyle} placeholder="Ej: Pérez" />
                                {errors.apellido && <span className={errorStyle}>{errors.apellido.message}</span>}
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>CUIL</label>
                                <input 
                                    {...register("cuil")} 
                                    className={inputStyle} 
                                    placeholder="20-00000000-0"
                                    maxLength={13} // 11 números + 2 guiones
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, ""); // Limpia todo lo que no sea número
                                        let formatted = value;
                                        
                                        if (value.length > 2 && value.length <= 10) {
                                            formatted = `${value.slice(0, 2)}-${value.slice(2)}`;
                                        } else if (value.length > 10) {
                                            formatted = `${value.slice(0, 2)}-${value.slice(2, 10)}-${value.slice(10, 11)}`;
                                        }
                                        
                                        // Usamos setValue para que react-hook-form se entere del cambio formateado
                                        setValue("cuil", formatted, { shouldValidate: true });
                                    }}
                                />
                                {errors.cuil && <span className={errorStyle}>{errors.cuil.message}</span>}
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>DNI</label>
                                <input {...register("dni")} className={inputStyle} placeholder="Solo números" />
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Fecha de Nacimiento</label>
                                <input 
                                    type="date" 
                                    {...register("fechaNacimiento")} 
                                    className={inputStyle} 
                                />
                                {errors.fechaNacimiento && <span className={errorStyle}>{errors.fechaNacimiento.message}</span>}
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Condición IVA</label>
                                <select className={inputStyle} {...register("condicionIVA")}>
                                    <option value="Responsable Inscripto">Responsable Inscripto</option>
                                    <option value="Monotributista">Monotributista</option>
                                    <option value="Exento">Exento</option>
                                    <option value="Consumidor Final">Consumidor Final</option>
                                </select>
                            </div>

                            {/* El Switch de Activo vuelve a su lugar original */}
                            <div className={stack({ gap: '1.5', justifyContent: 'center' })}>
                                <label className={labelStyle}>Estado del Cliente</label>
                                <label className={hstack({
                                    cursor: 'pointer', userSelect: 'none', gap: '3', p: '2',
                                    borderRadius: 'xl', border: '1px solid', borderColor: 'gray.200',
                                    bgColor: 'gray.50', transition: 'all 0.2s', _hover: { borderColor: 'blue.200' }
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

                    {/* Card: Ubicación y Contacto */}
                    <div className={cardStyle}>
                        <div className={hstack({ mb: '4', gap: '2' })}>
                            <MapPin size={18} className={css({ color: 'blue.600' })} />
                            <h3 className={sectionTitleStyle}>Ubicación y Contacto</h3>
                        </div>
                        <div className={grid({ columns: 2, gap: '4' })}>
                            <div className={css({ gridColumn: 'span 2' }, stack({ gap: '1.5' }))}>
                                <label className={labelStyle}>Dirección</label>
                                <input {...register("direccion")} className={inputStyle} />
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Email</label>
                                <input type="email" {...register("email")} className={inputStyle} />
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Teléfono</label>
                                <input {...register("telefono")} className={inputStyle} />
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Localidad</label>
                                <input {...register("localidad")} className={inputStyle} />
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Provincia</label>
                                <input {...register("provincia")} className={inputStyle} />
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Código Postal</label>
                                <input 
                                    {...register("codigoPostal")} 
                                    className={inputStyle} 
                                    placeholder="Ej: 5881" 
                                />
                                {errors.codigoPostal && <span className={errorStyle}>{errors.codigoPostal.message}</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna Lateral */}
                <div className={stack({ gap: '6' })}>
                    <div className={css({ p: '6', bgColor: 'blue.50', borderRadius: '2xl', border: '1px solid', borderColor: 'blue.100' })}>
                        <h4 className={css({ color: 'blue.800', fontWeight: 'bold', mb: '2', fontSize: 'sm' })}>Vista Previa</h4>
                        <div className={stack({ gap: '1' })}>
                            <p className={css({ color: 'blue.900', fontSize: 'md', fontWeight: '700' })}>
                                {watchNombre || watchApellido ? `${watchApellido || ''}, ${watchNombre || ''}` : 'Nuevo Cliente'}
                            </p>
                            <p className={css({ color: 'blue.600', fontSize: 'xs' })}>
                                {watchCuil ? `CUIL: ${watchCuil}` : 'CUIL no definido'}
                            </p>
                        </div>
                        <div className={css({ my: '4', borderTop: '1px dashed', borderColor: 'blue.200' })} />
                        <div className={hstack({ gap: '2', color: 'blue.700' })}>
                            <Info size={14} />
                            <span className={css({ fontSize: 'xs', fontWeight: '600' })}>Leadify ID System</span>
                        </div>
                    </div>

                    <div className={cardStyle}>
                        <div className={hstack({ mb: '2', gap: '2' })}>
                            <Wallet size={16} className={css({ color: 'blue.600' })} />
                            <label className={labelStyle}>Límite de Crédito</label>
                        </div>
                        <div className={css({ position: 'relative' })}>
                            <span className={css({ position: 'absolute', left: '3', top: '50%', transform: 'translateY(-50%)', color: 'gray.400' })}>$</span>
                            <input type="number" step="0.01" {...register("limiteCredito")} className={css({ ...inputStyleRaw, pl: '7', w: 'full' })} />
                        </div>
                    </div>

                    <div className={cardStyle}>
                        <label className={labelStyle}>Notas Internas</label>
                        <textarea
                            {...register("observaciones")}
                            className={css({ ...inputStyleRaw, minH: '100px', w: 'full', resize: 'none', mt: '2' })}
                            placeholder="Notas generales..."
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

// --- Estilos ---
const cardStyle = css({ p: '6', bgColor: 'white', borderRadius: '2xl', border: '1px solid', borderColor: 'gray.100', boxShadow: 'sm' });
const sectionTitleStyle = css({ fontWeight: '800', color: '#1A365D', fontSize: 'md' });
const labelStyle = css({ fontSize: 'xs', fontWeight: 'bold', color: 'gray.500', textTransform: 'uppercase', letterSpacing: 'wider' });
const errorStyle = css({ color: 'red.500', fontSize: '10px', fontWeight: 'bold' });
const inputStyleRaw = {
    p: '2.5', bgColor: 'gray.50', border: '1px solid', borderColor: 'gray.200',
    borderRadius: 'xl', fontSize: 'sm', outline: 'none', _focus: { borderColor: 'blue.400', bgColor: 'white' }
};
const inputStyle = css(inputStyleRaw);