import { PermisoRow } from './PermisoRow';
import { css } from '@/styled-system/css';
import { stack } from '@/styled-system/patterns';
import type { MenuPermiso } from '../types';

export const MatrizPermisos = ({
    permisos,
    onToggle
}: {
    permisos: MenuPermiso[],
    onToggle: (idMenu: number, campo: keyof Pick<MenuPermiso, 'permisoVer' | 'permisoCrear' | 'permisoEditar' | 'permisoEliminar'>) => void
}) => {
    return (
        <div className={stack({ gap: '0', borderRadius: 'xl', overflow: 'hidden', border: '1px solid', borderColor: 'gray.200', shadow: 'sm', bgColor: 'white' })}>
            {/* Cabecera */}
            <div className={css({
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '4', px: '5', py: '4',
                bgColor: 'slate.800', color: 'white', fontSize: 'xs', fontWeight: 'bold',
                letterSpacing: 'wider', textTransform: 'uppercase'
            })}>
                <span>Módulo / Funcionalidad</span>
                <span className={css({ textAlign: 'center' })}>Ver</span>
                <span className={css({ textAlign: 'center' })}>Crear</span>
                <span className={css({ textAlign: 'center' })}>Editar</span>
            </div>

            <div className={stack({ gap: '0', maxH: '600px', overflowY: 'auto', bgColor: 'gray.50/50' })}>
                {permisos.map((p) => (
                    <div key={p.idMenu} className={css({ display: 'flex', flexDirection: 'column' })}>
                        <PermisoRow
                            permiso={p}
                            onToggle={onToggle as any}
                        />
                        {p.subPermisos && p.subPermisos.length > 0 && (
                            <div className={stack({ gap: '0', ml: '8', borderLeft: '2px solid', borderColor: 'blue.100', my: '1' })}>
                                {p.subPermisos.map(sub => (
                                    <PermisoRow
                                        key={sub.idMenu}
                                        permiso={sub}
                                        onToggle={onToggle as any}
                                        isChild={true}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                {permisos.length === 0 && (
                    <div className={css({ textAlign: 'center', py: 12 })}>
                        <p className={css({ fontSize: 'lg', fontWeight: '500', color: 'gray.500' })}>No hay permisos registrados</p>
                        <p className={css({ fontSize: 'sm', mt: '2', color: 'gray.400' })}>Este perfil no tiene módulos asignados aún.</p>
                    </div>
                )}
            </div>
        </div>
    );
};