import { useRoles } from '../hooks/useRoles';
import { css } from '@/styled-system/css';
import { hstack, stack, center } from '@/styled-system/patterns';
import { X, Save } from 'lucide-react';

export function EditPermissionsModal({ idPerfil, nombrePerfil, onClose }: { idPerfil: number, nombrePerfil: string, onClose: () => void }) {
    const { permisos, handleToggle, saveChanges } = useRoles();

    return (
        <div className={css({ position: 'fixed', inset: 0, bgColor: 'black/40', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 })}>
            <div className={css({ bgColor: 'white', width: '90%', maxWidth: '800px', borderRadius: '2xl', shadow: '2xl' })}>
                {/* Header */}
                <div className={hstack({ justifyContent: 'space-between', p: '6', borderBottom: '1px solid', borderColor: 'gray.100' })}>
                    <div className={stack({ gap: '1' })}>
                        <h2 className={css({ fontSize: 'xl', fontWeight: 'bold', color: 'gray.800' })}>Configurar Permisos</h2>
                        <p className={css({ fontSize: 'sm', color: 'gray.500' })}>Perfil: <span className={css({ fontWeight: '600', color: 'blue.600' })}>{nombrePerfil}</span></p>
                    </div>
                    <button onClick={onClose} className={css({ color: 'gray.400', _hover: { color: 'gray.600' } })}><X size={24} /></button>
                </div>

                {/* Matriz de Permisos */}
                <div className={css({ p: '6', maxH: '60vh', overflowY: 'auto' })}>
                    <div className={css({ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '4', mb: '4', px: '4', py: '2', bgColor: 'gray.50', borderRadius: 'lg' })}>
                        <span className={css({ fontSize: 'xs', fontWeight: 'bold', color: 'gray.500', textTransform: 'uppercase' })}>Módulo / Pantalla</span>
                        <span className={css({ textAlign: 'center', fontSize: 'xs', fontWeight: 'bold', color: 'gray.500', textTransform: 'uppercase' })}>Ver</span>
                        <span className={css({ textAlign: 'center', fontSize: 'xs', fontWeight: 'bold', color: 'gray.500', textTransform: 'uppercase' })}>Crear</span>
                        <span className={css({ textAlign: 'center', fontSize: 'xs', fontWeight: 'bold', color: 'gray.500', textTransform: 'uppercase' })}>Editar</span>
                    </div>

                    <div className={stack({ gap: '1' })}>
                        {permisos.map((p) => (
                            <div key={p.idMenu} className={css({ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '4', px: '4', py: '3', borderBottom: '1px solid', borderColor: 'gray.50', _hover: { bgColor: 'gray.50/50' } })}>
                                <span className={css({ fontSize: 'sm', fontWeight: '500', color: 'gray.700' })}>{p.nombre}</span>
                                <div className={center()}>
                                    <input type="checkbox" checked={p.permisoVer} onChange={() => handleToggle(p.idMenu, 'permisoVer')} />
                                </div>
                                <div className={center()}>
                                    <input type="checkbox" checked={p.permisoCrear} onChange={() => handleToggle(p.idMenu, 'permisoCrear')} />
                                </div>
                                <div className={center()}>
                                    <input type="checkbox" checked={p.permisoEditar} onChange={() => handleToggle(p.idMenu, 'permisoEditar')} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className={hstack({ justifyContent: 'flex-end', gap: '3', p: '6', borderTop: '1px solid', borderColor: 'gray.100' })}>
                    <button onClick={onClose} className={css({ px: '4', py: '2', color: 'gray.600', fontWeight: '600', _hover: { color: 'gray.800' } })}>Cancelar</button>
                    <button
                        onClick={() => saveChanges(idPerfil)}
                        className={hstack({ px: '6', py: '2', bgColor: 'blue.600', color: 'white', borderRadius: 'lg', fontWeight: 'bold', _hover: { bgColor: 'blue.700' }, transition: '0.2s' })}
                    >
                        <Save size={18} /> Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
}