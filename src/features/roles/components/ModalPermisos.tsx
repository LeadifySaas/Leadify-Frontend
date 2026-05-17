import { useEffect } from 'react';
import { useRoles } from '../hooks/useRoles';
import { MatrizPermisos } from './MatrizPermisos';
import { css } from '@/styled-system/css';
import { hstack, stack } from '@/styled-system/patterns';
import { X, Save } from 'lucide-react';

export function ModalPermisos({ idPerfil, nombrePerfil, onClose }: { idPerfil: number, nombrePerfil: string, onClose: () => void }) {
    const { permisos, loadPermisos, handleToggle, saveChanges, loading } = useRoles();

    useEffect(() => {
        loadPermisos(idPerfil);
    }, [idPerfil, loadPermisos]);

    const handleSave = async () => {
        await saveChanges(idPerfil);
        onClose();
    };

    return (
        <div className={css({ position: 'fixed', inset: 0, bgColor: 'slate.900/40', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 })}>
            <div className={css({ bgColor: 'white', width: '90%', maxWidth: '850px', borderRadius: '2xl', shadow: '2xl', overflow: 'hidden', border: '1px solid', borderColor: 'white' })}>
                {/* Header */}
                <div className={hstack({ 
                    justifyContent: 'space-between', 
                    p: '6', 
                    bgColor: 'blue.50/50',
                    borderBottom: '1px solid', 
                    borderColor: 'blue.100' 
                })}>
                    <div className={stack({ gap: '1' })}>
                        <h2 className={css({ fontSize: '2xl', fontWeight: '800', color: 'slate.800', letterSpacing: 'tight' })}>Configurar Permisos</h2>
                        <p className={css({ fontSize: 'sm', color: 'gray.500' })}>
                            Estás modificando los accesos para el perfil <span className={css({ fontWeight: '700', color: 'blue.600', px: '2', py: '0.5', bgColor: 'blue.100', borderRadius: 'md' })}>{nombrePerfil}</span>
                        </p>
                    </div>
                    <button onClick={onClose} disabled={loading} className={css({ 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        w: '10', h: '10', borderRadius: 'full', color: 'gray.400', 
                        transition: '0.2s', _hover: { color: 'gray.700', bgColor: 'white', shadow: 'sm' } 
                    })}><X size={20} /></button>
                </div>

                {/* Body */}
                <div className={css({ p: '6', maxH: '65vh', overflowY: 'auto', bgColor: 'gray.50/30' })}>
                    {loading && permisos.length === 0 ? (
                        <div className={css({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4', py: '12' })}>
                            <div className={css({ w: '8', h: '8', border: '3px solid', borderColor: 'blue.200', borderTopColor: 'blue.600', borderRadius: 'full', animation: 'spin 1s linear infinite' })} />
                            <p className={css({ color: 'gray.500', fontWeight: '500' })}>Cargando permisos...</p>
                        </div>
                    ) : (
                        <MatrizPermisos permisos={permisos} onToggle={handleToggle} />
                    )}
                </div>

                {/* Footer */}
                <div className={hstack({ justifyContent: 'flex-end', gap: '3', p: '5', bgColor: 'gray.50', borderTop: '1px solid', borderColor: 'gray.100' })}>
                    <button onClick={onClose} disabled={loading} className={css({ px: '5', py: '2.5', color: 'gray.600', fontWeight: '600', borderRadius: 'lg', transition: '0.2s', _hover: { bgColor: 'gray.200', color: 'gray.800' } })}>Cancelar</button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className={hstack({ px: '6', py: '2.5', bgColor: loading ? 'blue.400' : 'blue.600', color: 'white', borderRadius: 'lg', fontWeight: 'bold', shadow: 'sm', _hover: { bgColor: loading ? 'blue.400' : 'blue.700', transform: 'translateY(-1px)', shadow: 'md' }, transition: 'all 0.2s' })}
                    >
                        <Save size={18} /> {loading ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>
            </div>
        </div>
    );
}