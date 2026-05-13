import { useState } from 'react';
import { css } from '../../../../styled-system/css';
import {
  stack,
  hstack,
  center,
  grid
} from '../../../../styled-system/patterns';
import { Settings, Users, Link, CreditCard, Mail, Plus } from 'lucide-react';

export default function ConfiguracionPage() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: <Settings size={18} /> },
    { id: 'equipo', label: 'Usuarios y Roles', icon: <Users size={18} /> },

    {
      id: 'comunicaciones',
      label: 'Email y Canales',
      icon: <Mail size={18} />
    },
    { id: 'integraciones', label: 'Integraciones', icon: <Link size={18} /> },
    {
      id: 'planes',
      label: 'Plan y Facturación',
      icon: <CreditCard size={18} />
    }
  ];

  return (
    <div
      className={stack({ gap: '6', p: '6', minH: '100vh', bgColor: '#F8FAFC' })}
    >
      {/* Header */}
      <div className={stack({ gap: '1' })}>
        <h1
          className={css({
            fontSize: '2xl',
            fontWeight: '800',
            color: '#1A365D'
          })}
        >
          Configuración del Sistema
        </h1>
        <p className={css({ fontSize: 'sm', color: 'gray.500' })}>
          Administrá las preferencias globales y parámetros de Leadify
        </p>
      </div>

      <div className={grid({ columns: 12, gap: '6', alignItems: 'start' })}>
        {/* Sidebar de Navegación */}
        <div className={css({ gridColumn: { base: 'span 12', lg: 'span 3' } })}>
          <div
            className={css({
              bgColor: 'white',
              borderRadius: '2xl',
              p: '2',
              border: '1px solid',
              borderColor: 'gray.200'
            })}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={hstack({
                  w: 'full',
                  p: '3',
                  borderRadius: 'xl',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  gap: '3',
                  color: activeTab === tab.id ? 'blue.600' : 'gray.600',
                  bgColor: activeTab === tab.id ? 'blue.50' : 'transparent',
                  fontWeight: activeTab === tab.id ? 'bold' : 'medium',
                  _hover: {
                    bgColor: activeTab === tab.id ? 'blue.50' : 'gray.50'
                  }
                })}
              >
                {tab.icon}
                <span className={css({ fontSize: 'sm' })}>{tab.label}</span>
                {activeTab === tab.id && (
                  <div
                    className={css({
                      ml: 'auto',
                      w: '1.5',
                      h: '1.5',
                      borderRadius: 'full',
                      bgColor: 'blue.600'
                    })}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido Dinámico */}
        <div
          className={css({
            gridColumn: { base: 'span 12', lg: 'span 9' },
            gap: 6
          })}
        >
          {activeTab === 'general' && (
            <div className={stack({ gap: '6' })}>
              <SectionCard
                title="Información de la Empresa"
                description="Estos datos aparecerán en presupuestos y comunicaciones."
              >
                <div className={grid({ columns: 2, gap: '4' })}>
                  <Field label="Nombre Legal" value="Leadify S.A." />
                  <Field label="CUIT" value="30-71234567-8" />
                  <Field label="Sitio Web" value="https://leadify-crm.com" />
                  <Field
                    label="Moneda Principal"
                    type="select"
                    options={[
                      'ARS - Peso Argentino',
                      'USD - Dólar Estadounidense'
                    ]}
                  />
                </div>
              </SectionCard>

              <SectionCard
                title="Logo del CRM"
                description="Subí el logo que verá tu equipo en el dashboard."
              >
                <div className={hstack({ gap: '6' })}>
                  <div
                    className={center({
                      w: '24',
                      h: '24',
                      bgColor: 'gray.100',
                      borderRadius: 'xl',
                      border: '1px solid',
                      borderColor: 'gray.200'
                    })}
                  >
                    <span
                      className={css({ fontSize: 'xs', color: 'gray.400' })}
                    >
                      Logo
                    </span>
                  </div>
                  <button
                    className={css({
                      px: '4',
                      py: '2',
                      border: '1px solid',
                      borderColor: 'gray.300',
                      borderRadius: 'lg',
                      fontSize: 'sm',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    })}
                  >
                    Cambiar Imagen
                  </button>
                </div>
              </SectionCard>
            </div>
          )}

          {activeTab === 'equipo' && (
            <div className={stack({ gap: '6' })}>
              <div className={hstack({ justifyContent: 'space-between' })}>
                <h3 className={css({ fontWeight: 'bold', color: 'gray.700' })}>
                  Miembros del Equipo (3)
                </h3>
                <button
                  className={hstack({
                    px: '4',
                    py: '2',
                    bgColor: 'blue.600',
                    color: 'white',
                    borderRadius: 'lg',
                    fontSize: 'sm',
                    fontWeight: 'bold'
                  })}
                >
                  <Plus size={16} /> Invitar Usuario
                </button>
              </div>

              <div
                className={css({
                  bgColor: 'white',
                  borderRadius: '2xl',
                  border: '1px solid',
                  borderColor: 'gray.200',
                  overflow: 'hidden'
                })}
              >
                <table
                  className={css({
                    w: 'full',
                    textAlign: 'left',
                    borderCollapse: 'collapse'
                  })}
                >
                  <thead
                    className={css({
                      bgColor: 'gray.50',
                      borderBottom: '1px solid',
                      borderColor: 'gray.100'
                    })}
                  >
                    <tr>
                      <th className={thStyle}>USUARIO</th>
                      <th className={thStyle}>ROL</th>
                      <th className={thStyle}>ESTADO</th>
                      <th className={thStyle}></th>
                    </tr>
                  </thead>
                  <tbody>
                    <UserRow
                      name="Juan de la Pala"
                      email="juan@leadify.com"
                      role="Admin"
                      status="Activo"
                    />
                    <UserRow
                      name="Clara Buffa"
                      email="clara@leadify.com"
                      role="Tetas"
                      status="Activo"
                    />
                    <UserRow
                      name="Salome"
                      email="salome@leadify.com"
                      role="Inadmisible"
                      status="Pendiente"
                    />
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Botón de Guardado Global (opcional según el diseño) */}
          <div className={hstack({ justifyContent: 'flex-end', pt: '4' })}>
            <button
              className={css({
                px: '8',
                py: '3',
                bgColor: 'blue.600',
                color: 'white',
                borderRadius: 'xl',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                cursor: 'pointer'
              })}
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Sub-componentes para Limpiar el Código ---

function SectionCard({ title, description, children }: any) {
  return (
    <div
      className={css({
        bgColor: 'white',
        borderRadius: '2xl',
        border: '1px solid',
        borderColor: 'gray.200',
        p: '6',
        boxShadow: 'sm'
      })}
    >
      <div className={stack({ gap: '1', mb: '5' })}>
        <h3
          className={css({
            fontSize: 'md',
            fontWeight: '700',
            color: 'gray.800'
          })}
        >
          {title}
        </h3>
        <p className={css({ fontSize: 'xs', color: 'gray.500' })}>
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

function Field({ label, value, type = 'text', options = [] }: any) {
  return (
    <div className={stack({ gap: '1.5' })}>
      <label
        className={css({
          fontSize: '10px',
          fontWeight: 'bold',
          color: 'gray.500',
          textTransform: 'uppercase'
        })}
      >
        {label}
      </label>
      {type === 'text' ? (
        <input
          type="text"
          defaultValue={value}
          className={css({
            p: '2.5',
            border: '1px solid',
            borderColor: 'gray.200',
            borderRadius: 'lg',
            fontSize: 'sm',
            outline: 'none',
            _focus: { borderColor: 'blue.400' }
          })}
        />
      ) : (
        <select
          className={css({
            p: '2.5',
            border: '1px solid',
            borderColor: 'gray.200',
            borderRadius: 'lg',
            fontSize: 'sm',
            bgColor: 'white'
          })}
        >
          {options.map((opt: string) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      )}
    </div>
  );
}

function UserRow({ name, email, role, status }: any) {
  return (
    <tr
      className={css({
        borderBottom: '1px solid',
        borderColor: 'gray.50',
        _hover: { bgColor: 'gray.50/50' }
      })}
    >
      <td className={tdStyle}>
        <div className={stack({ gap: '0' })}>
          <span className={css({ fontWeight: 'bold', color: 'gray.700' })}>
            {name}
          </span>
          <span className={css({ fontSize: 'xs', color: 'gray.500' })}>
            {email}
          </span>
        </div>
      </td>
      <td className={tdStyle}>
        <span
          className={css({
            px: '2',
            py: '1',
            bgColor: 'gray.100',
            borderRadius: 'md',
            fontSize: 'xs',
            color: 'gray.600'
          })}
        >
          {role}
        </span>
      </td>
      <td className={tdStyle}>
        <div className={hstack({ gap: '1.5' })}>
          <div
            className={css({
              w: '1.5',
              h: '1.5',
              borderRadius: 'full',
              bgColor: status === 'Activo' ? 'green.500' : 'orange.400'
            })}
          />
          <span className={css({ fontSize: 'xs' })}>{status}</span>
        </div>
      </td>
      <td className={tdStyle}>
        <button
          className={css({
            color: 'gray.400',
            cursor: 'pointer',
            _hover: { color: 'red.500' }
          })}
        >
          Gestionar
        </button>
      </td>
    </tr>
  );
}

const thStyle = css({
  p: '4',
  fontSize: '10px',
  color: 'gray.400',
  fontWeight: '800',
  textTransform: 'uppercase',
  letterSpacing: 'wider'
});
const tdStyle = css({ p: '4', fontSize: 'sm' });
