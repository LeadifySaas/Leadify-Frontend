import { css } from '../../../../styled-system/css';
import { stack, grid, hstack, center } from '../../../../styled-system/patterns';
import { Save, ArrowLeft, User, ShieldCheck, Info, Phone, Briefcase, FileText } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UsuarioSchema, type UsuarioFormValues } from "../schemas";
import { useUsuarios } from "../hooks/useUsuario";

interface Props {
    mode: 'create' | 'edit';
    initialData?: any;
}

export function UsuarioForm({ mode, initialData }: Props) {
    const navigate = useNavigate();
    const { createUsuario, updateUsuario, isCreating, isUpdating } = useUsuarios();

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<UsuarioFormValues>({
        resolver: zodResolver(UsuarioSchema),
        defaultValues: initialData || {
            rolId: 2,
            activo: true,
            areaSector: "", 
            telefono: "",
            observaciones: ""
        },
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    const onSubmit: SubmitHandler<UsuarioFormValues> = async (data) => {


        try {
            if (mode === 'create') {
                await createUsuario(data);
            } else {
                await updateUsuario({ id: initialData.id, ...data });
            }
            navigate({ to: '/administracion/Usuarios' });
        } catch (error) {
            console.error("Error al guardar usuario:", error);
        }
    };

    // Vista previa dinámica
    const currentNombre = watch("nombre");
    const currentApellido = watch("apellido");
    const currentEmail = watch("email");
    const currentArea = watch("areaSector");

    const isLoading = isCreating || isUpdating;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={stack({ gap: '6', p: '2' })}>

            {/* Header */}
            <div className={hstack({ justifyContent: 'space-between' })}>
                <div className={hstack({ gap: '4' })}>
                    <button
                        type="button"
                        onClick={() => navigate({ to: '/administracion/Usuarios' })}
                        className={center({ p: '2', borderRadius: 'xl', _hover: { bgColor: 'gray.100' }, cursor: 'pointer' })}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className={css({ fontSize: '2xl', fontWeight: '800', color: '#1A365D' })}>
                        {mode === 'create' ? 'Registrar Nuevo Usuario' : 'Editar Usuario'}
                    </h1>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={hstack({
                        px: '6', py: '2.5', bgColor: 'blue.600', color: 'white',
                        borderRadius: 'xl', fontWeight: 'bold', cursor: 'pointer',
                        _hover: { bgColor: 'blue.700' },
                        opacity: isLoading ? 0.7 : 1
                    })}
                >
                    <Save size={18} /> {isLoading ? 'Guardando...' : (mode === 'create' ? 'Crear Usuario' : 'Guardar Cambios')}
                </button>
            </div>

            <div className={grid({ columns: { base: 1, lg: 3 }, gap: '6' })}>

                {/* Columna Principal */}
                <div className={css({ lg: { gridColumn: 'span 2' }, spaceY: '6' })}>

                    {/* Card: Información Personal y Contacto */}
                    <div className={cardStyle}>
                        <div className={hstack({ mb: '4', gap: '2' })}>
                            <User size={18} className={css({ color: 'blue.600' })} />
                            <h3 className={sectionTitleStyle}>Información Personal y Contacto</h3>
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
                                <label className={labelStyle}>
                                    <div className={hstack({ gap: '1' })}><Phone size={12} /> Teléfono</div>
                                </label>
                                <input {...register("telefono")} className={inputStyle} placeholder="Ej: 11 2233 4455" />
                                {errors.telefono && <span className={errorStyle}>{errors.telefono.message}</span>}
                            </div>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>
                                    <div className={hstack({ gap: '1' })}><Briefcase size={12} /> Área o Sector</div>
                                </label>
                                <select {...register("areaSector")} className={inputStyle}>
                                    <option value="">Seleccione un área...</option>
                                    <option value="Fábrica">Fábrica</option>
                                    <option value="Ventas">Ventas</option>
                                    <option value="Administración">Administración</option>
                                    <option value="Logística">Logística</option>
                                </select>
                                {errors.areaSector && <span className={errorStyle}>{errors.areaSector.message}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Card: Seguridad y Acceso */}
                    <div className={cardStyle}>
                        <div className={hstack({ mb: '4', gap: '2' })}>
                            <ShieldCheck size={18} className={css({ color: 'blue.600' })} />
                            <h3 className={sectionTitleStyle}>Seguridad y Acceso</h3>
                        </div>
                        <div className={grid({ columns: 2, gap: '4' })}>
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Email (Usuario)</label>
                                <input 
                                    type="email" 
                                    {...register("email")} 
                                    className={inputStyle} 
                                    disabled={mode === 'edit'} // Email suele ser inmutable
                                    placeholder="usuario@leadify.com" 
                                />
                                {errors.email && <span className={errorStyle}>{errors.email.message}</span>}
                            </div>
                            
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Contraseña {mode === 'edit' && "(opcional)"}</label>
                                <input type="password" {...register("password")} className={inputStyle} placeholder="••••••••" />
                                {errors.password && <span className={errorStyle}>{errors.password.message}</span>}
                            </div>

                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Rol del Sistema</label>
                                <select className={inputStyle} {...register("rolId")}>
                                    <option value="1">Administrador</option>
                                    <option value="2">Vendedor</option>
                                    <option value="3">Logística</option>
                                </select>
                            </div>

                            <div className={stack({ gap: '1.5', justifyContent: 'center' })}>
                                <label className={labelStyle}>Estado de Cuenta</label>
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
                </div>

                {/* Columna Lateral */}
                <div className={stack({ gap: '6' })}>
                    <div className={css({ p: '6', bgColor: 'blue.50', borderRadius: '2xl', border: '1px solid', borderColor: 'blue.100' })}>
                        <h4 className={css({ color: 'blue.800', fontWeight: 'bold', mb: '2', fontSize: 'sm' })}>Vista Previa</h4>
                        <div className={stack({ gap: '1' })}>
                            <p className={css({ color: 'blue.900', fontSize: 'md', fontWeight: '700' })}>
                                {currentNombre || currentApellido ? `${currentNombre} ${currentApellido}`.trim() : 'Nombre Usuario'}
                            </p>
                            <p className={css({ color: 'blue.600', fontSize: 'xs' })}>
                                {currentEmail || 'email@sistema.com'}
                            </p>
                            {currentArea && (
                                <span className={css({ mt: '2', display: 'inline-block', fontSize: '10px', px: '2', py: '0.5', bgColor: 'blue.200/50', color: 'blue.700', borderRadius: 'md', w: 'fit-content', fontWeight: 'bold' })}>
                                    {currentArea}
                                </span>
                            )}
                        </div>
                        <div className={css({ my: '4', borderTop: '1px dashed', borderColor: 'blue.200' })} />
                        <div className={hstack({ gap: '2', color: 'blue.700' })}>
                            <Info size={14} />
                            <span className={css({ fontSize: 'xs', fontWeight: '600' })}>ID System</span>
                        </div>
                    </div>

                    <div className={cardStyle}>
                         <label className={labelStyle}>
                            <div className={hstack({ gap: '1' })}><FileText size={12} /> Observaciones Internas</div>
                         </label>
                         <textarea 
                            {...register("observaciones")}
                            className={css({
                                p: '2.5', bgColor: 'gray.50', border: '1px solid', borderColor: 'gray.200',
                                borderRadius: 'xl', fontSize: 'sm', outline: 'none', mt: '2',
                                w: 'full', minH: '120px', resize: 'none',
                                _focus: { borderColor: 'blue.400', bgColor: 'white' }
                            })}
                            placeholder="Notas administrativas sobre el perfil..."
                         />
                    </div>
                </div>
            </div>
        </form>
    );
}

// Estilos se mantienen igual que en tu base
const cardStyle = css({ p: '6', bgColor: 'white', borderRadius: '2xl', border: '1px solid', borderColor: 'gray.100', boxShadow: 'sm' });
const sectionTitleStyle = css({ fontWeight: '800', color: '#1A365D', fontSize: 'md' });
const labelStyle = css({ fontSize: 'xs', fontWeight: 'bold', color: 'gray.500', textTransform: 'uppercase', letterSpacing: 'wider' });
const errorStyle = css({ color: 'red.500', fontSize: '10px', fontWeight: 'bold' });
const inputStyle = css({
    p: '2.5', bgColor: 'gray.50', border: '1px solid', borderColor: 'gray.200',
    w: 'full', borderRadius: 'xl', fontSize: 'sm', outline: 'none', 
    _focus: { borderColor: 'blue.400', bgColor: 'white' }
});