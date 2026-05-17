import {
  ArrowLeft,
  Package,
  BadgeDollarSign,
  Settings2,
  ImagePlus,
  Save
} from 'lucide-react';
import { css } from '@/styled-system/css';
import { stack, grid, hstack, center } from '@/styled-system/patterns';
import { useArticuloForm } from '../hooks/useArticulosForm';
import { styles, toggleStyles } from './ArticuloForm.styles';
import { ArticuloImageUploader } from './ArticuloFormImageUploader';

interface Props {
  mode: 'create' | 'edit';
  initialData?: any;
  isModal?: boolean; // <-- Nos avisa si estamos en modo modal
  onSuccess?: () => void; // <-- Callback para cerrar el modal al guardar
}

export function ArticuloForm({ mode, initialData, isModal, onSuccess }: Props) {
  const { form, preview, handleDeleteImage, onSubmit, isSaving, navigate } =
    useArticuloForm({ mode, initialData, onSuccess });
  const {
    register,
    formState: { errors }
  } = form;

  return (
    <form onSubmit={onSubmit} className={stack({ gap: '6', p: '2' })}>
      {/* HEADER: Solo lo mostramos si NO estamos dentro del modal */}
      {!isModal && (
        <div className={hstack({ justifyContent: 'space-between' })}>
          <div className={hstack({ gap: '4' })}>
            <button
              type="button"
              onClick={() => navigate({ to: '/materiales/articulos' })}
              className={center({
                p: '2',
                borderRadius: 'xl',
                _hover: { bgColor: 'gray.100' },
                cursor: 'pointer'
              })}
            >
              <ArrowLeft size={20} />
            </button>
            <h1
              className={css({
                fontSize: '2xl',
                fontWeight: '800',
                color: '#1A365D'
              })}
            >
              {mode === 'create' ? 'Nuevo Artículo' : 'Editar Artículo'}
            </h1>
          </div>
          <button type="submit" disabled={isSaving} className={styles.saveBtn}>
            <Save size={18} /> {isSaving ? 'Guardando...' : 'Guardar Artículo'}
          </button>
        </div>
      )}

      <div className={grid({ columns: { base: 1, lg: 3 }, gap: '6' })}>
        {/* COLUMNA IZQUIERDA (Info y Stock) */}
        <div className={css({ lg: { gridColumn: 'span 2' }, spaceY: '6' })}>
          <div className={styles.card}>
            <div className={hstack({ mb: '4', gap: '2' })}>
              <Package size={18} className={css({ color: 'blue.600' })} />
              <h3 className={styles.sectionTitle}>Información del Producto</h3>
            </div>
            <div className={grid({ columns: 2, gap: '4' })}>
              <div className={stack({ gap: '1.5' })}>
                <label className={styles.label}>Código (SKU)</label>
                <input
                  {...register('codigo')}
                  className={styles.input}
                  disabled={mode === 'edit'}
                />
                {errors.codigo && (
                  <span className={styles.error}>
                    {errors.codigo.message as string}
                  </span>
                )}
              </div>
              <div className={stack({ gap: '1.5' })}>
                <label className={styles.label}>Nombre</label>
                <input {...register('nombre')} className={styles.input} />
                {errors.nombre && (
                  <span className={styles.error}>
                    {errors.nombre.message as string}
                  </span>
                )}
              </div>
              <div className={stack({ gap: '1.5', gridColumn: 'span 2' })}>
                <label className={styles.label}>Descripción</label>
                <textarea
                  {...register('descripcion')}
                  className={styles.input}
                  rows={3}
                  style={{ resize: 'none' }}
                />
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={hstack({ mb: '4', gap: '2' })}>
              <BadgeDollarSign
                size={18}
                className={css({ color: 'green.600' })}
              />
              <h3 className={styles.sectionTitle}>Valores y Stock</h3>
            </div>
            <div className={grid({ columns: 3, gap: '4' })}>
              <div className={stack({ gap: '1.5' })}>
                <label className={styles.label}>Precio Venta</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('precioVenta', { valueAsNumber: true })}
                  className={styles.input}
                />
              </div>
              <div className={stack({ gap: '1.5' })}>
                <label className={styles.label}>Stock Actual</label>
                <input
                  type="number"
                  {...register('stockActual', { valueAsNumber: true })}
                  className={styles.input}
                />
              </div>
              <div className={stack({ gap: '1.5' })}>
                <label className={styles.label}>Unidad de Medida</label>
                <select {...register('unidadMedida')} className={styles.input}>
                  <option value="Unidades">Unidades</option>
                  <option value="Metros">Metros</option>
                  <option value="Kilos">Kilos</option>
                  <option value="Litros">Litros</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA (Imagen y Settings) */}
        <div className={stack({ gap: '6' })}>
          <div className={styles.card}>
            <div className={hstack({ mb: '4', gap: '2' })}>
              <ImagePlus size={18} className={css({ color: 'purple.600' })} />
              <h3 className={styles.sectionTitle}>Multimedia</h3>
            </div>
            <div className={stack({ gap: '4' })}>
              <ArticuloImageUploader
                preview={preview}
                onDelete={handleDeleteImage}
                registerImage={register('imagen' as any)}
              />
            </div>
          </div>

          <div className={styles.card}>
            <div className={hstack({ mb: '4', gap: '2' })}>
              <Settings2 size={18} className={css({ color: 'gray.600' })} />
              <h3 className={styles.sectionTitle}>Configuración</h3>
            </div>
            <div
              className={hstack({ justifyContent: 'space-between', p: '2' })}
            >
              <span
                className={css({
                  fontSize: 'sm',
                  fontWeight: '600',
                  color: 'gray.700'
                })}
              >
                Artículo Activo
              </span>
              <label className={toggleStyles.container}>
                <input
                  type="checkbox"
                  {...register('activo')}
                  className={toggleStyles.input}
                />
                <span className={toggleStyles.slider} />
              </label>
            </div>
          </div>

          {/* BOTÓN GUARDAR PARA EL MODAL: Lo agregamos al final para que el usuario pueda guardar desde ahí */}
          {isModal && (
            <button
              type="submit"
              disabled={isSaving}
              className={styles.saveBtn}
            >
              <Save size={18} />{' '}
              {isSaving ? 'Guardando...' : 'Guardar Artículo'}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
