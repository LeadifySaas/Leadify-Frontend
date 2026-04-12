import { css } from '../../../../styled-system/css';
import { stack, grid, hstack, center } from '../../../../styled-system/patterns';
import { Save, ArrowLeft, Building2, ShieldCheck, Info, MapPin, Briefcase } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { empresaSchema, type EmpresaFormValues } from "../schemas";
import { useEmpresas } from "../hooks/useEmpresas";
import { useClientes } from "../../cliente/hooks/useClientes";

interface Props {
    mode: 'create' | 'edit';
    initialData?: any;
}

export function EmpresaForm({ mode, initialData }: Props) {
    const navigate = useNavigate();
    const { createEmpresa, updateEmpresa, isCreating } = useEmpresas();
    const { clientesQuery } = useClientes(1, 100); // Para el select de Clientes

    const { register, setValue, handleSubmit, watch, reset, formState: { errors } } = useForm<EmpresaFormValues>({
        resolver: zodResolver(empresaSchema),
        defaultValues: initialData || {
            condicionIva: "Responsable Inscripto",
            activo: true,
        },
    });

    useEffect(() => {
        if (initialData) {
            const formattedData = {
                ...initialData,
                emailFacturacion: initialData.emailFacturacion ?? "",
                direccionFiscal: initialData.direccionFiscal ?? "",
                clienteId: initialData.clienteId?.toString() ?? "",
            };
            reset(formattedData);
        }
    }, [initialData, reset]);

    const onSubmit: SubmitHandler<EmpresaFormValues> = async (data) => {
        try {
            if (mode === 'create') {
                await createEmpresa(data);
            } else {
                await updateEmpresa({ id: initialData.id, ...data });
            }
            navigate({ to: '/administracion/empresas' });
        } catch (error) {
            console.error("Error", error);
        }
    };

    const watchRazonSocial = watch("razonSocial");
    const watchCuit = watch("cuit");
    const watchActivo = watch("activo");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={stack({ gap: '6', p: '2' })}>

            {/* Header del Formulario */}
            <div className={hstack({ justifyContent: 'space-between' })}>
                <div className={hstack({ gap: '4' })}>
                    <button
                        type="button"
                        onClick={() => navigate({ to: '/administracion/empresas' })}
                        className={center({ p: '2', borderRadius: 'xl', _hover: { bgColor: 'gray.100' }, cursor: 'pointer' })}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className={css({ fontSize: '2xl', fontWeight: '800', color: '#1A365D' })}>
                        {mode === 'create' ? 'Registrar Nueva Empresa' : 'Editar Empresa'}
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
                    <Save size={18} /> {isCreating ? 'Guardando...' : (mode === 'create' ? 'Crear Empresa' : 'Guardar Cambios')}
                </button>
            </div>

            <div className={grid({ columns: { base: 1, lg: 3 }, gap: '6' })}>

                {/* Columna Principal */}
                <div className={css({ lg: { gridColumn: 'span 2' }, spaceY: '6' })}>

                    {/* Card: Datos Fiscales */}
                    <div className={cardStyle}>
                        <div className={hstack({ mb: '4', gap: '2' })}>
                            <ShieldCheck size={18} className={css({ color: 'blue.600' })} />
                            <h3 className={sectionTitleStyle}>Información Fiscal</h3>
                        </div>
                        <div className={grid({ columns: 2, gap: '4' })}>
                            <div className={css({ gridColumn: 'span 2' }, stack({ gap: '1.5' }))}>
                                <label className={labelStyle}>Cliente Dueño</label>
                                <select {...register("clienteId")} className={inputStyle}>
                                    <option value="">Seleccione un cliente representante...</option>
                                    {clientesQuery.data?.items?.map((c: any) => (
                                        <option key={c.id} value={c.id}>
                                            {c.apellido}, {c.nombre} ({c.cuil})
                                        </option>
                                    ))}
                                </select>
                                {errors.clienteId && <span className={errorStyle}>{errors.clienteId.message}</span>}
                            </div>
                            
                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Razón Social</label>
                                <input {...register("razonSocial")} className={inputStyle} placeholder="Ej: Mi Empresa S.A." />
                                {errors.razonSocial && <span className={errorStyle}>{errors.razonSocial.message}</span>}
                            </div>

                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>CUIT</label>
                                <input 
                                    {...register("cuit")} 
                                    className={inputStyle} 
                                    placeholder="00-00000000-0"
                                    maxLength={13}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "");
                                        let formatted = value;
                                        if (value.length > 2 && value.length <= 10) {
                                            formatted = `${value.slice(0, 2)}-${value.slice(2)}`;
                                        } else if (value.length > 10) {
                                            formatted = `${value.slice(0, 2)}-${value.slice(2, 10)}-${value.slice(10, 11)}`;
                                        }
                                        setValue("cuit", formatted, { shouldValidate: true });
                                    }}
                                />
                                {errors.cuit && <span className={errorStyle}>{errors.cuit.message}</span>}
                            </div>

                            <div className={stack({ gap: '1.5' })}>
                                <label className={labelStyle}>Condición IVA</label>
                                <select className={inputStyle} {...register("condicionIva")}>
                                    <option value="Responsable Inscripto">Responsable Inscripto</option>
                                    <option value="Monotributista">Monotributista</option>
                                    <option value="Exento">Exento</option>
                                    <option value="Consumidor Final">Consumidor Final</option>
                                </select>
                            </div>

                            <div className={stack({ gap: '1.5', justifyContent: 'center' })}>
                                <label className={labelStyle}>Estado Empresa</label>
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
                                    <span className={css({ fontSize: 'sm', fontWeight: '600', color: watchActivo ? 'green.600' : 'gray.500' })}>
                                        {watchActivo ? 'Activa' : 'Inactiva'}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Card: Ubicación y Facturación */}
                    <div className={cardStyle}>
                        <div className={hstack({ mb: '4', gap: '2' })}>
                            <MapPin size={18} className={css({ color: 'blue.600' })} />
                            <h3 className={sectionTitleStyle}>Ubicación y Facturación</h3>
                        </div>
                        <div className={grid({ columns: 2, gap: '4' })}>
                            <div className={css({ gridColumn: 'span 2' }, stack({ gap: '1.5' }))}>
                                <label className={labelStyle}>Dirección Fiscal</label>
                                <input {...register("direccionFiscal")} className={inputStyle} placeholder="Ej: Av. Principal 123" />
                            </div>
                            <div className={css({ gridColumn: 'span 2' }, stack({ gap: '1.5' }))}>
                                <label className={labelStyle}>Email de Facturación</label>
                                <input type="email" {...register("emailFacturacion")} className={inputStyle} placeholder="facturas@empresa.com" />
                                {errors.emailFacturacion && <span className={errorStyle}>{errors.emailFacturacion.message}</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna Lateral */}
                <div className={stack({ gap: '6' })}>
                    <div className={css({ p: '6', bgColor: 'blue.50', borderRadius: '2xl', border: '1px solid', borderColor: 'blue.100' })}>
                        <h4 className={css({ color: 'blue.800', fontWeight: 'bold', mb: '2', fontSize: 'sm' })}>Vista Previa Fiscal</h4>
                        <div className={stack({ gap: '1' })}>
                            <p className={css({ color: 'blue.900', fontSize: 'md', fontWeight: '700' })}>
                                {watchRazonSocial || 'Razón Social'}
                            </p>
                            <p className={css({ color: 'blue.600', fontSize: 'xs' })}>
                                {watchCuit ? `CUIT: ${watchCuit}` : 'CUIT no definido'}
                            </p>
                        </div>
                        <div className={css({ my: '4', borderTop: '1px dashed', borderColor: 'blue.200' })} />
                        <div className={hstack({ gap: '2', color: 'blue.700' })}>
                            <Building2 size={14} />
                            <span className={css({ fontSize: 'xs', fontWeight: '600' })}>Entidad Fiscal Registrada</span>
                        </div>
                    </div>

                    <div className={cardStyle}>
                        <div className={hstack({ mb: '2', gap: '2' })}>
                            <Briefcase size={16} className={css({ color: 'blue.600' })} />
                            <label className={labelStyle}>Asignación de Cliente</label>
                        </div>
                        <p className={css({ fontSize: 'xs', color: 'gray.500' })}>
                            Toda empresa debe estar vinculada a un cliente principal para la gestión comercial.
                        </p>
                    </div>
                </div>
            </div>
        </form>
    );
}

// --- Estilos Reutilizados de ClienteForm ---
const cardStyle = css({ p: '6', bgColor: 'white', borderRadius: '2xl', border: '1px solid', borderColor: 'gray.100', boxShadow: 'sm' });
const sectionTitleStyle = css({ fontWeight: '800', color: '#1A365D', fontSize: 'md' });
const labelStyle = css({ fontSize: 'xs', fontWeight: 'bold', color: 'gray.500', textTransform: 'uppercase', letterSpacing: 'wider' });
const errorStyle = css({ color: 'red.500', fontSize: '10px', fontWeight: 'bold' });
const inputStyleRaw = {
    p: '2.5', bgColor: 'gray.50', border: '1px solid', borderColor: 'gray.200',
    borderRadius: 'xl', fontSize: 'sm', outline: 'none', _focus: { borderColor: 'blue.400', bgColor: 'white' }
};
const inputStyle = css(inputStyleRaw);