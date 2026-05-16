import type { MenuPermiso } from '../types';
import { css } from '@/styled-system/css';
import { center, hstack } from '@/styled-system/patterns';
import { ChevronRight } from 'lucide-react';

interface PermisoRowProps {
    permiso: MenuPermiso;
    onToggle: (id: number, campo: keyof MenuPermiso) => void;
    isChild?: boolean;
}

export function PermisoRow({ permiso, onToggle, isChild }: PermisoRowProps) {
    return (
        <div className={css({
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '4', px: '5', py: isChild ? '3' : '4',
            borderBottom: '1px solid', borderColor: 'gray.100', transition: 'all 0.2s ease',
            bgColor: 'white',
            _hover: { bgColor: 'blue.50/50', transform: 'translateX(2px)' }
        })}>
            <div className={hstack({ gap: '3' })}>
                {isChild && <ChevronRight size={14} className={css({ color: 'blue.400' })} />}
                <span className={css({ 
                    fontSize: isChild ? 'sm' : 'md', 
                    fontWeight: isChild ? '500' : '600', 
                    color: isChild ? 'gray.600' : 'slate.800' 
                })}>
                    {permiso.nombre}
                </span>
            </div>
            
            {['permisoVer', 'permisoCrear', 'permisoEditar'].map((campo) => (
                <div key={campo} className={center()}>
                    <label className={css({ 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        cursor: 'pointer', w: '8', h: '8', borderRadius: 'full',
                        transition: '0.2s', _hover: { bgColor: 'gray.100' }
                    })}>
                        <input
                            type="checkbox"
                            checked={permiso[campo as keyof MenuPermiso] as boolean}
                            onChange={() => onToggle(permiso.idMenu, campo as keyof MenuPermiso)}
                            className={css({ 
                                width: '4.5', height: '4.5', accentColor: 'blue.600', 
                                cursor: 'pointer', transition: 'transform 0.2s',
                                _hover: { transform: 'scale(1.1)' }
                            })}
                        />
                    </label>
                </div>
            ))}
        </div>
    );
}
