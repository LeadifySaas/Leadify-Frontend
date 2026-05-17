import { css } from '@/styled-system/css';
import { hstack, stack } from '@/styled-system/patterns';
import { Edit2, Shield } from 'lucide-react';
import { usePermissions } from '@/shared/hooks/usePermissions';

export function RolesTable({ perfiles, onEdit }: { perfiles: any[], onEdit: (id: number) => void }) {
    const { canEdit } = usePermissions();

    return (
        <div className={css({ bgColor: 'white', borderRadius: 'xl', border: '1px solid', borderColor: 'gray.200', overflow: 'hidden' })}>
            <table className={css({ width: '100%', borderCollapse: 'collapse' })}>
                <thead className={css({ bgColor: 'gray.50', borderBottom: '1px solid', borderColor: 'gray.200' })}>
                    <tr>
                        <th className={css({ p: '4', textAlign: 'left', fontSize: 'xs', color: 'gray.500', fontWeight: 'bold', textTransform: 'uppercase' })}>Perfil</th>
                        <th className={css({ p: '4', textAlign: 'left', fontSize: 'xs', color: 'gray.500', fontWeight: 'bold', textTransform: 'uppercase' })}>Estado</th>
                        {canEdit && (
                            <th className={css({ p: '4', textAlign: 'right', fontSize: 'xs', color: 'gray.500', fontWeight: 'bold', textTransform: 'uppercase' })}>Acciones</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {perfiles.map((perfil) => (
                        <tr key={perfil.idPerfil} className={css({ borderBottom: '1px solid', borderColor: 'gray.100', _hover: { bgColor: 'gray.50/50' } })}>
                            <td className={css({ p: '4' })}>
                                <div className={hstack({ gap: '3' })}>
                                    <div className={css({ p: '2', bgColor: 'blue.50', color: 'blue.600', borderRadius: 'lg' })}><Shield size={16} /></div>
                                    <span className={css({ fontWeight: '600', color: 'gray.700' })}>{perfil.nombre}</span>
                                </div>
                            </td>
                            <td className={css({ p: '4' })}>
                                <span className={css({
                                    px: '2.5', py: '0.5', borderRadius: 'full', fontSize: 'xs', fontWeight: '600',
                                    bgColor: perfil.activo ? 'green.50' : 'red.50',
                                    color: perfil.activo ? 'green.600' : 'red.600'
                                })}>
                                    {perfil.activo ? 'Activo' : 'Inactivo'}
                                </span>
                            </td>
                            {canEdit && (
                                <td className={css({ p: '4', textAlign: 'right' })}>
                                    <button
                                        onClick={() => onEdit(perfil.idPerfil)}
                                        className={css({ p: '2', color: 'gray.400', _hover: { color: 'blue.600', bgColor: 'blue.50' }, borderRadius: 'md', transition: '0.2s' })}
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}