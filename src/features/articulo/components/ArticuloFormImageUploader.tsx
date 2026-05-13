import { ImagePlus, X } from 'lucide-react';
import { css } from '@/styled-system/css';
import { center, stack } from '@/styled-system/patterns';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  preview: string | null;
  onDelete: () => void;
  registerImage: UseFormRegisterReturn;
}

export function ArticuloImageUploader({
  preview,
  onDelete,
  registerImage
}: Props) {
  return (
    <div className={stack({ gap: '4' })}>
      <div
        className={center({
          w: 'full',
          h: '200px',
          border: '2px dashed',
          borderColor: preview ? 'blue.200' : 'gray.200',
          borderRadius: '2xl',
          bgColor: 'gray.50',
          position: 'relative',
          overflow: 'hidden',
          _hover: { borderColor: 'blue.400' },
          transition: 'all 0.2s'
        })}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className={css({
                w: 'full',
                h: 'full',
                objectFit: 'contain',
                p: '2'
              })}
            />
            <button
              type="button"
              onClick={onDelete}
              className={css({
                position: 'absolute',
                top: '2',
                right: '2',
                p: '1',
                bgColor: 'white',
                borderRadius: 'full',
                boxShadow: 'md',
                color: 'red.500',
                cursor: 'pointer'
              })}
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <label
            className={center({
              gap: '2',
              cursor: 'pointer',
              w: 'full',
              h: 'full'
            })}
          >
            <ImagePlus size={32} className={css({ color: 'gray.400' })} />
            <span
              className={css({
                fontSize: 'xs',
                color: 'gray.500',
                fontWeight: 'bold'
              })}
            >
              SUBIR IMAGEN
            </span>
            <input
              type="file"
              accept="image/*"
              className={css({ display: 'none' })}
              {...registerImage}
            />
          </label>
        )}
      </div>
      <p
        className={css({
          fontSize: '10px',
          color: 'gray.400',
          textAlign: 'center'
        })}
      >
        Formatos permitidos: JPG, PNG. Máx 2MB.
      </p>
    </div>
  );
}
