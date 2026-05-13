import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { articuloSchema, type ArticuloFormValues } from '@/features/articulo/schemas';
import api from '@/shared/lib/api';
import { useArticulos } from '@/features/articulo/hooks/useArticulos';

interface UseArticuloFormProps {
    mode: 'create' | 'edit';
    initialData?: any;
    onSuccess?: () => void; // <-- Recibimos el callback
}

export function useArticuloForm({ mode, initialData, onSuccess }: UseArticuloFormProps) {
    const navigate = useNavigate();
    const [preview, setPreview] = useState<string | null>(null);
    const [archivoId, setArchivoId] = useState<number | null>(null);
    const [markImageForDeletion, setMarkImageForDeletion] = useState(false);

    const { createArticulo, updateArticulo, isCreating, isUpdating } = useArticulos();

    const form = useForm<ArticuloFormValues>({
        resolver: zodResolver(articuloSchema),
        defaultValues: initialData || {
            unidadMedida: 'Unidades',
            activo: true,
            precioVenta: 0,
            stockActual: 0,
            descripcion: ''
        }
    });

    const imageFile = form.watch('imagen' as any);

    // Preview de imagen local
    useEffect(() => {
        if (imageFile && imageFile[0] instanceof File) {
            const objectUrl = URL.createObjectURL(imageFile[0]);
            setPreview(objectUrl);
            setMarkImageForDeletion(false);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [imageFile]);

    // Cargar datos e imagen inicial
    useEffect(() => {
        if (initialData) {
            form.reset(initialData);
            const loadImagen = async () => {
                if (mode === 'edit' && initialData.id) {
                    try {
                        const response = await api.get(`/images/articulos/${initialData.id}`);
                        const imagenes = Array.isArray(response.data) ? response.data : [];
                        if (imagenes.length > 0) {
                            const imagen = imagenes[0];
                            setArchivoId(imagen.id);
                            const baseURL = api.defaults.baseURL?.replace(/\/$/, '') || '';
                            setPreview(`${baseURL}/images/descargar/${imagen.id}`);
                        }
                    } catch (error) {
                        console.error('Error al cargar la imagen:', error);
                    }
                }
            };
            loadImagen();
        }
    }, [initialData, form, mode]);

    const handleDeleteImage = () => {
        setPreview(null);
        form.setValue('imagen' as any, null);
        if (archivoId) {
            setMarkImageForDeletion(true);
        }
    };

    const onSubmit = async (data: ArticuloFormValues) => {
        try {
            let currentId = initialData?.id;

            // 1. Guardar o Editar
            if (mode === 'create') {
                const result = await createArticulo(data);
                currentId = (result as any).id || (result as any).data?.id;
            } else {
                await updateArticulo({ id: initialData.id, ...data });
            }

            // 2. Limpieza de imagen si se marcó para borrar
            if (markImageForDeletion && archivoId) {
                await api.delete(`/images/${archivoId}`);
            }

            // 3. Subir imagen nueva
            const archivoImagen = data.imagen;
            if (currentId && archivoImagen && archivoImagen.length > 0) {
                const file = archivoImagen[0];
                if (file instanceof File) {
                    const formData = new FormData();
                    formData.append('file', file);
                    await api.post(`/images/articulos/${currentId}`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                }
            }

            // LOGICA DE RETORNO:
            if (onSuccess) {
                // Si estamos en un modal, ejecutamos el callback (cerrar modal, refresh, etc)
                onSuccess();
            } else {
                // Si no hay callback, asumimos que es la página completa y navegamos
                navigate({ to: '/materiales/articulos' });
            }

        } catch (error: any) {
            if (error.response?.status === 400 && error.response.data.includes('ya existe')) {
                form.setError('codigo' as any, { type: 'manual', message: 'Este código ya está en uso' });
            } else {
                alert('Ocurrió un error al guardar el artículo.');
            }
        }
    };

    return {
        form,
        preview,
        handleDeleteImage,
        onSubmit: form.handleSubmit(onSubmit),
        isSaving: isCreating || isUpdating,
        navigate
    };
}