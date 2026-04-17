import { css } from '../../../../styled-system/css';
import { stack, grid, hstack, center } from '../../../../styled-system/patterns';
import { Save, ArrowLeft, User, Phone, Mail, Building2, MessageSquare } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactoSchema, type ContactoFormValues } from "../schemas";
import { useContactos } from "../hooks/useContacto";
import { useClientes } from "../../cliente/hooks/useClientes"; 
import { useEmpresas } from "../../empresa/hooks/useEmpresas";

interface Props {
    mode: 'create' | 'edit';
    initialData?: any;
}

export function ContactoForm({ mode, initialData }: Props) {
    const navigate = useNavigate();
    const { createContacto, updateContacto, isCreating } = useContactos();
    
    const { clientesQuery } = useClientes(1, 100); 
    const { empresasQuery } = useEmpresas(1, 100);

    const { register, handleSubmit, watch, reset, setError, formState: { errors } } = useForm<ContactoFormValues>({
        resolver: zodResolver(contactoSchema),
        defaultValues: initialData || {
            activo: true,
            nombre: "",
            apellido: "",
            puesto: "",
            email: "",
            telefono: "",
            observaciones: "",
            clienteId: "",
            empresaId: ""
        },
    });

    useEffect(() => {
        if (initialData) {
            const formattedData = {
                ...initialData,
                puesto: initialData.puesto ?? "",
                email: initialData.email ?? "",
                telefono: initialData.telefono ?? "",
                observaciones: initialData.observaciones ?? "",
                clienteId: initialData.clienteId ?? "",
                empresaId: initialData.empresaId ?? "",
            };
            reset(formattedData);
        }
    }, [initialData, reset]);

    const onSubmit: SubmitHandler<ContactoFormValues> = async (data) => {
        try {
            if (mode === 'create') {
                await createContacto(data);
            } else {
                await updateContacto({ id: initialData.id, ...data });
            }
            navigate({ to: '/administracion/contactos' });
        } catch (error:any) {
            const serverMessage = error.response?.data?.message;
            const statusCode = error.response?.status;

            if (statusCode === 400 && serverMessage?.toLowerCase().includes("email")) {
                setError("email", { 
                    type: "manual", 
                    message: serverMessage 
                });
             
            } else {
              
                console.error("Error crítico:", error);
            }
        }
    };

    const watchNombre = watch("nombre");
    const watchApellido = watch("apellido");
    const watchPuesto = watch("puesto");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={stack({ gap: '6', p: '2' })}>

            {/* Header del Formulario */}
            <div className={hstack({ justifyContent: 'space-between' })}>
                <div className={hstack({ gap: '4' })}>
                    <button
                        type="button"
                        onClick={() => navigate({ to: '/administracion/contactos' })}
                        className={center({ p: '2', borderRadius: 'xl', _hover: { bgColor: 'gray.100' }, cursor: 'pointer' })}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className={css({ fontSize: '2xl', fontWeight: '800', color: '#1A365D' })}>
                        {mode === 'create' ? 'Nuevo Contacto' : 'Editar Contacto'}
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
                    <Save size={18} /> {isCreating ? 'Guardando...' : (mode === 'create' ? 'Crear Contacto' : 'Guardar Cambios')}
                </button>
            </div>

            <div className={grid({ columns: { base: 1, lg: 3 }, gap: '6' })}>

                {/* Columna Principal */}
                <div className={css({ lg: { gridColumn: 'span 2' }, spaceY: '6' })}>

                    {/* Card: Datos Personales y de Contacto */}
                    <div className={cardStyle}>
                        <div className={hstack({ mb: '4', gap: '2' })}>
                            <User size={18} className={css({ color: 'blue.600' })} />
                            <h3 className={sectionTitleStyle}>Información del Contacto</h3>
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
                                <label className={labelStyle}>Cargo / Puesto</label>
                                <input {...register("puesto")} className={inputStyle} placeholder="Ej: Gerente de Ventas" />
                            </div>

                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>ESTADO DEL CONTACTO</label>
                                <label className={hstack({
                                    cursor: 'pointer', 
                                    userSelect: 'none', 
                                    gap: '3', 
                                    p: '2.5', // Ajustado para coincidir con la imagen
                                    borderRadius: 'xl', 
                                    border: '1px solid', 
                                    borderColor: 'gray.100', // Más suave como en la captura
                                    bgColor: 'gray.50/50', 
                                    h: '45px',
                                    transition: 'all 0.2s',
                                    _hover: { borderColor: 'gray.200' }
                                })}>
                                    {/* Switch Visual */}
                                    <div className={css({
                                        position: 'relative',
                                        w: '44px',
                                        h: '24px',
                                        bgColor: watch("activo") ? '#22C55E' : 'gray.300', // El verde de tu imagen
                                        borderRadius: 'full',
                                        transition: 'all 0.3s'
                                    })}>
                                        <div className={css({
                                            position: 'absolute',
                                            top: '2px',
                                            left: watch("activo") ? '22px' : '2px',
                                            w: '20px',
                                            h: '20px',
                                            bgColor: 'white',
                                            borderRadius: 'full',
                                            transition: 'all 0.3s',
                                            boxShadow: 'sm'
                                        })} />
                                    </div>
                                    <input 
                                        type="checkbox" 
                                        {...register("activo")} 
                                        className={css({ display: 'none' })} // Ocultamos el check nativo
                                    />
                                    <span className={css({ 
                                        fontSize: 'sm', 
                                        fontWeight: '600', 
                                        color: watch("activo") ? '#22C55E' : 'gray.500' 
                                    })}>
                                        {watch("activo") ? 'Activo' : 'Inactivo'}
                                    </span>
                                </label>
                            </div>

                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Email</label>
                                <div className={css({ position: 'relative' })}>
                                    <Mail size={16} className={css({ position: 'absolute', left: '3', top: '50%', transform: 'translateY(-50%)', color: 'gray.400' })} />
                                    <input {...register("email")} className={css({ ...inputStyleRaw, pl: '10', w: 'full' })} placeholder="correo@ejemplo.com" />
                                </div>
                                {errors.email && <span className={errorStyle}>{errors.email.message}</span>}
                            </div>

                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Teléfono</label>
                                <div className={css({ position: 'relative' })}>
                                    <Phone size={16} className={css({ position: 'absolute', left: '3', top: '50%', transform: 'translateY(-50%)', color: 'gray.400' })} />
                                    <input {...register("telefono")} className={css({ ...inputStyleRaw, pl: '10', w: 'full' })} placeholder="+54 9 ..." />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card: Vinculación */}
                    <div className={cardStyle}>
                        <div className={hstack({ mb: '4', gap: '2' })}>
                            <Building2 size={18} className={css({ color: 'blue.600' })} />
                            <h3 className={sectionTitleStyle}>Vinculación con Entidad</h3>
                        </div>
                        <div className={grid({ columns: 2, gap: '4' })}>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Empresa (Opcional)</label>
                                <select {...register("empresaId")} className={inputStyle}>
                                    <option value="">Ninguna empresa</option>
                                    {empresasQuery.data?.items.map((e: any) => (
                                        <option key={e.id} value={e.id}>{e.razonSocial}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Cliente Directo (Opcional)</label>
                                <select {...register("clienteId")} className={inputStyle}>
                                    <option value="">Ningún cliente</option>
                                    {clientesQuery.data?.items.map((c: any) => (
                                        <option key={c.id} value={c.id}>{c.apellido}, {c.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna Lateral */}
                <div className={stack({ gap: '6' })}>
                    {/* Vista Previa */}
                    <div className={css({ p: '6', bgColor: 'blue.50', borderRadius: '2xl', border: '1px solid', borderColor: 'blue.100' })}>
                        <h4 className={css({ color: 'blue.800', fontWeight: 'bold', mb: '2', fontSize: 'sm' })}>Ficha Rápida</h4>
                        <div className={stack({ gap: '1' })}>
                            <p className={css({ color: 'blue.900', fontSize: 'md', fontWeight: '700' })}>
                                {watchNombre || watchApellido ? `${watchApellido || ''}, ${watchNombre || ''}` : 'Nuevo Contacto'}
                            </p>
                            <p className={css({ color: 'blue.600', fontSize: 'xs', fontWeight: '600' })}>
                                {watchPuesto || 'Sin cargo definido'}
                            </p>
                        </div>
                        <div className={css({ my: '4', borderTop: '1px dashed', borderColor: 'blue.200' })} />
                        <div className={stack({ gap: '2' })}>
                            <div className={hstack({ gap: '2', color: 'blue.700', fontSize: 'xs' })}>
                                <Mail size={12} /> {watch("email") || 'Sin email'}
                            </div>
                            <div className={hstack({ gap: '2', color: 'blue.700', fontSize: 'xs' })}>
                                <Phone size={12} /> {watch("telefono") || 'Sin teléfono'}
                            </div>
                        </div>
                    </div>

                    <div className={cardStyle}>
                        <div className={hstack({ mb: '2', gap: '2' })}>
                            <MessageSquare size={16} className={css({ color: 'blue.600' })} />
                            <label className={labelStyle}>Observaciones</label>
                        </div>
                        <textarea
                            {...register("observaciones")}
                            className={css({ ...inputStyleRaw, minH: '120px', w: 'full', resize: 'none' })}
                            placeholder="Notas sobre el contacto..."
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

const cardStyle = css({ p: '6', bgColor: 'white', borderRadius: '2xl', border: '1px solid', borderColor: 'gray.100', boxShadow: 'sm' });
const sectionTitleStyle = css({ fontWeight: '800', color: '#1A365D', fontSize: 'md' });
const labelStyle = css({ fontSize: 'xs', fontWeight: 'bold', color: 'gray.500', textTransform: 'uppercase', letterSpacing: 'wider' });
const errorStyle = css({ color: 'red.500', fontSize: '10px', fontWeight: 'bold' });
const inputStyleRaw = {
    p: '2.5', bgColor: 'gray.50', border: '1px solid', borderColor: 'gray.200',
    borderRadius: 'xl', fontSize: 'sm', outline: 'none', _focus: { borderColor: 'blue.400', bgColor: 'white' }
};
const inputStyle = css(inputStyleRaw);