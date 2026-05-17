import { useState, useEffect } from 'react';
import { css } from '@/styled-system/css';
import { stack, hstack } from '@/styled-system/patterns';
import { RolesTable } from '../components/RolesTable';
import { ModalPermisos } from '../components/ModalPermisos';
import { useRoles } from '../hooks/useRoles';

export function RolesPage() {
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const { perfiles, loadPerfiles, loading } = useRoles();

  useEffect(() => {
    loadPerfiles();
  }, [loadPerfiles]);

  const roleName = selectedRole 
    ? perfiles.find(p => p.idPerfil === selectedRole)?.nombre || 'Perfil'
    : '';

  return (
    <div className={stack({ gap: '6' })}>
      <div className={hstack({ justifyContent: 'space-between' })}>
        <div>
          <h1 className={css({ fontSize: '2xl', fontWeight: 'bold', color: 'gray.800' })}>
            Roles y Permisos
          </h1>
          <p className={css({ color: 'gray.500', fontSize: 'sm', mt: '1' })}>
            Gestiona los niveles de acceso al sistema y sus correspondientes funcionalidades.
          </p>
        </div>
      </div>

      {loading && perfiles.length === 0 ? (
          <p className={css({ color: 'gray.500' })}>Cargando perfiles...</p>
      ) : (
          <RolesTable perfiles={perfiles} onEdit={setSelectedRole} />
      )}

      {selectedRole && (
        <ModalPermisos
          idPerfil={selectedRole}
          nombrePerfil={roleName}
          onClose={() => setSelectedRole(null)}
        />
      )}
    </div>
  );
}
