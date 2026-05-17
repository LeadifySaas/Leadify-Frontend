import { css } from '../../../../styled-system/css';
import { stack, grid, hstack, center } from '../../../../styled-system/patterns';
import { Save, ArrowLeft, Building2, Phone, Mail, User, Briefcase } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { proveedorSchema, type ProveedorFormValues } from "../schemas";
import { useProveedores } from "../hooks/useProveedores";
import api from "@/shared/lib/api";
import { ProveedorArchivosList, type Archivo } from "./ProveedorArchivosList";
// Importamos los estilos desde el nuevo archivo central
import { cardStyle, sectionTitleStyle, labelStyle, inputStyle, saveButtonStyle, errorStyle } from '@/shared/styles/formStyles';
import { toast } from 'react-toastify';

export function ProveedorForm({ mode, initialData }: Props) {
    const navigate = useNavigate();
    const { createProveedor, updateProveedor, isCreating } = useProveedores();
    const [archivos, setArchivos] = useState<Archivo[]>([]);

    const { register, handleSubmit, reset, formState: { errors } , watch} = useForm<ProveedorFormValues>({
        resolver: zodResolver(proveedorSchema),
        defaultValues: initialData || { activo: true, rubro: "" },
    });

    const loadArchivos = async () => {
        if (mode === 'edit' && initialData?.id) {
            try {
                
                const response = await api.get(`/Proveedores/${initialData.id}/archivos`);
                setArchivos(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Error al cargar archivos:", error);
                setArchivos([]);
            }
        }
    };

    useEffect(() => {
        if (initialData) {
            reset({ ...initialData });
            loadArchivos();
        }
    }, [initialData, reset]);

    const onSubmit: SubmitHandler<ProveedorFormValues> = async (data) => {
        try {
            if (mode === 'create') await createProveedor(data);
            else await updateProveedor({ id: initialData.id, ...data });
            navigate({ to: '/administracion/proveedores' });
        } catch (error) { console.error(error); }
    };

    const handleFileUpload = async (file: File) => {
        if (!initialData?.id) return;
        
        const formData = new FormData();
        formData.append("file", file);

        try {
            // 2. Usa 'api' (tu instancia) en lugar de 'axios'
            await api.post(`/Proveedores/${initialData.id}/archivos`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await loadArchivos();
        } catch (error) { 
            console.error(error);
            alert("Error al subir archivo"); 
        }
    };

   
    const handleViewFile = (archivoId: number) => {
        
        const baseURL = api.defaults.baseURL; 
        
        const url = `${baseURL}/Proveedores/descargar-archivo/${archivoId}?verEnNavegador=true`;
        
        window.open(url, '_blank')
    };


    const handleDownloadFile = async (archivoId: number, fileName: string) => {
        try {
            
            const response = await api.get(`/Proveedores/descargar-archivo/${archivoId}?verEnNavegador=false`, {
                responseType: 'blob'
            });

            // Creamos el blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            
            toast.success("Archivo descargado correctamente", { position: "bottom-center", autoClose: 3000 });
            
        } catch (error) {
            console.error("Error al descargar:", error);
            toast.error("Ocurrió un error al intentar descargar el archivo.", { position: "bottom-center", autoClose: 3000 });
        }
    };

    const handleDeleteFile = async (archivoId: number) => {
        try {
           
            await api.delete(`/Proveedores/archivos/${archivoId}`);
            await loadArchivos();
        } catch (error) { 
            console.error(error);
            alert("Error al borrar archivo"); 
        }
    };
    const watchRazonSocial = watch("razonSocial");
    const watchCuit = watch("cuit");
    const watchActivo = watch("activo");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={stack({ gap: '6', p: '2' })}>
            {/* Header Estandarizado */}
            <div className={hstack({ justifyContent: 'space-between' })}>
                <div className={hstack({ gap: '4' })}>
                    <button type="button" onClick={() => navigate({ to: '/administracion/proveedores' })} className={center({ p: '2', borderRadius: 'xl', _hover: { bgColor: 'gray.100' }, cursor: 'pointer' })}>
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className={css({ fontSize: '2xl', fontWeight: '800', color: '#1A365D' })}>
                        {mode === 'create' ? 'Nuevo Proveedor' : 'Editar Proveedor'}
                    </h1>
                </div>
                <button type="submit" disabled={isCreating} className={saveButtonStyle}>
                    <Save size={18} /> {isCreating ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </div>

            {/* Layout en Grid como Empresa */}
            <div className={grid({ columns: { base: 1, lg: 3 }, gap: '6' })}>
                
                {/* Info General */}
                <div className={cardStyle}>
                    <div className={hstack({ mb: '4', gap: '2' })}>
                        <User size={18} className={css({ color: 'blue.600' })} />
                        <h3 className={sectionTitleStyle}>Información General</h3>
                    </div>
                    <div className={stack({ gap: '4' })}>
                        <div>
                            <label className={labelStyle}>Razón Social</label>
                            <input {...register("razonSocial")} className={inputStyle} placeholder="Nombre o Razón Social" />
                        </div>
                        <div>
                            <label className={labelStyle}>CUIT</label>
                            <input {...register("cuit")} className={inputStyle} placeholder="00-00000000-0" />
                        </div>
                    </div>

                    <div className={stack({ gap: '1.5', justifyContent: 'center' })}>
                                                <label className={labelStyle}>Estado Proveedor</label>
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

                {/* Contacto */}
                <div className={cardStyle}>
                    <div className={hstack({ mb: '4', gap: '2' })}>
                        <Phone size={18} className={css({ color: 'blue.600' })} />
                        <h3 className={sectionTitleStyle}>Datos de Contacto</h3>
                    </div>
                    <div className={stack({ gap: '4' })}>
                        <div>
                            <label className={labelStyle}>Email</label>
                            <input {...register("email")} className={inputStyle} placeholder="contacto@empresa.com" />
                        </div>
                        <div>
                            <label className={labelStyle}>Teléfono</label>
                            <input {...register("telefono")} className={inputStyle} placeholder="+54 11 ..." />
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

                    
                </div>
                
            </div>

            {/* Archivos (Solo en edición) */}
            {mode === 'edit' && (
                <ProveedorArchivosList 
                    archivos={archivos} 
                    onDelete={handleDeleteFile} 
                    onUpload={handleFileUpload} 
                    onDownload={handleDownloadFile}
                    onView={handleViewFile}
                />
            )}
        </form>
    );
}