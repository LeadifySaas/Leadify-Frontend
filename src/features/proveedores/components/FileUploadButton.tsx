import { useRef } from 'react';
import { css } from '../../../../styled-system/css';
import { hstack } from '../../../../styled-system/patterns';
import { Upload } from 'lucide-react';

interface Props {
  onUpload: (file: File) => void;
}

export function FileUploadButton({ onUpload }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
      event.target.value = ''; // Reset para permitir subir el mismo archivo de nuevo
    }
  };

  return (
    <>
      <input type="file" ref={inputRef} onChange={handleFileChange} style={{ display: 'none' }} />
      <button 
        type="button" 
        onClick={() => inputRef.current?.click()}
        className={hstack({ 
            px: '3', py: '1.5', bgColor: 'white', border: '1px solid', borderColor: 'gray.200', 
            borderRadius: 'lg', fontSize: 'sm', fontWeight: 'medium', color: 'gray.700', 
            cursor: 'pointer', _hover: { bgColor: 'gray.50' }
        })}
      >
        <Upload size={16} />
        Adjuntar
      </button>
    </>
  );
}