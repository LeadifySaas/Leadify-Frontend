import { FileText, Trash2, Download, Eye } from 'lucide-react';
import { css } from '../../../../styled-system/css';
import { hstack, stack } from '../../../../styled-system/patterns';
import { FileUploadButton } from './FileUploadButton';

export interface Archivo {
  id: number;
  nombreOriginal: string;
}

interface Props {
  archivos: Archivo[];
  onDelete: (id: number) => void;
  onUpload: (file: File) => void;
  onDownload: (id: number, nombre: string) => void;
  onView: (id: number) => void;
}

export function ProveedorArchivosList({ archivos, onDelete, onUpload, onDownload, onView }: Props) {
  return (
    <div className={css({ mt: '6', p: '6', bgColor: 'white', borderRadius: '2xl', border: '1px solid', borderColor: 'gray.100', boxShadow: 'sm' })}>
      <div className={hstack({ justifyContent: 'space-between', mb: '4' })}>
        <h3 className={css({ fontWeight: '800', fontSize: 'lg', color: '#1A365D' })}>Archivos Adjuntos</h3>
        <FileUploadButton onUpload={onUpload} />
      </div>
      
<div className={stack({ gap: '2' })}>
        {Array.isArray(archivos) && archivos.length > 0 ? (
          archivos.map((archivo) => (
            <div key={archivo.id} className={hstack({ p: '3', bgColor: 'gray.50', borderRadius: 'xl', justifyContent: 'space-between', border: '1px solid', borderColor: 'gray.100' })}>
              <div className={hstack({ gap: '3' })}>
                <FileText size={20} className={css({ color: 'blue.500' })} />
                <span className={css({ fontSize: 'sm', fontWeight: '500' })}>{archivo.nombreOriginal}</span>
              </div>
              
              <div className={hstack({ gap: '1' })}>
                {/* 3. Nuevo botón Ver */}
                <button 
                  type='button'
                  onClick={() => onView(archivo.id)} 
                  className={css({ p: '2', color: 'gray.400', cursor: 'pointer', borderRadius: 'lg', _hover: { color: 'green.600', bgColor: 'green.50' } })}
                  title="Ver archivo"
                >
                  <Eye size={16} />
                </button>

                <button 
                  type='button'
                  onClick={() => onDownload(archivo.id, archivo.nombreOriginal)} 
                  className={css({ p: '2', color: 'gray.400', cursor: 'pointer', borderRadius: 'lg', _hover: { color: 'blue.600', bgColor: 'blue.50' } })}
                  title="Descargar archivo"
                >
                  <Download size={16} />
                </button>

                <button 
                  type='button'
                  onClick={() => onDelete(archivo.id)} 
                  className={css({ p: '2', color: 'gray.400', cursor: 'pointer', borderRadius: 'lg', _hover: { color: 'red.600', bgColor: 'red.50' } })}
                  title="Eliminar archivo"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={css({ color: 'gray.400', fontSize: 'sm', textAlign: 'center', py: '6' })}>No hay archivos adjuntos.</p>
        )}
      </div>



    </div>
  );
}