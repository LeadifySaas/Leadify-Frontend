import { useState } from 'react';
import { css } from '../../../../styled-system/css';
import { stack, hstack, center } from '../../../../styled-system/patterns';
import {
  User,
  Save,
  Mail,
  Lock,
  Camera,
  Bell,
  Shield,
  Image as ImageIcon,
  Briefcase,
  MapPin,
  Smartphone
} from 'lucide-react';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    // Personal
    nombre: 'Test',
    apellido: 'Usuario',
    dni: '35.123.456',

    // Contacto y Ubicación
    email: 'test@leadify.com',
    telefono: '+54 9 11 1234-5678',
    telefonoAlternativo: '',
    direccion: 'Av. Corrientes 1234',
    ciudad: 'Buenos Aires',
    pais: 'Argentina',

    // Laboral
    puesto: 'Desarrollador de Software',
    departamento: 'Equipo de Desarrollo',
    rolSistema: 'Administrador',

    // Preferencias
    idioma: 'es-AR',
    zonaHoraria: 'America/Argentina/Buenos Aires',
    notificacionesEmail: true,
    notificacionesSistema: true,

    // Seguridad
    passwordActual: '',
    nuevaPassword: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (field: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className={stack({ gap: '6', p: '6' })}>
      {/* Header */}
      <div className={hstack({ justifyContent: 'space-between' })}>
        <div className={hstack({ gap: '3' })}>
          <div
            className={center({
              p: '2.5',
              bgColor: 'blue.50',
              color: 'blue.600',
              borderRadius: 'xl'
            })}
          >
            <User size={24} />
          </div>
          <div>
            <h1
              className={css({
                fontSize: '2xl',
                fontWeight: '800',
                color: '#1A365D'
              })}
            >
              Mi Perfil
            </h1>
            <p className={css({ fontSize: 'sm', color: 'gray.500' })}>
              Gestioná tu información personal, laboral y preferencias del CRM
            </p>
          </div>
        </div>

        <button
          className={hstack({
            px: '5',
            py: '2.5',
            bgColor: 'blue.600',
            color: 'white',
            borderRadius: 'xl',
            fontWeight: 'bold',
            cursor: 'pointer',
            _hover: { bgColor: 'blue.700' },
            transition: 'all 0.2s'
          })}
        >
          <Save size={18} /> Guardar Cambios
        </button>
      </div>

      {/* Layout Principal Grid */}
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr', xl: '2fr 1fr' },
          gap: '6',
          alignItems: 'start'
        })}
      >
        {/* COLUMNA IZQUIERDA: Datos Detallados */}
        <div className={stack({ gap: '6' })}>
          {/* Card: Información Personal */}
          <div className={cardStyle}>
            <div className={cardHeaderStyle}>
              <User size={18} className={css({ color: 'blue.600' })} />
              <h2 className={cardTitleStyle}>Información Básica</h2>
            </div>
            <div
              className={css({
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '4'
              })}
            >
              <div className={stack({ gap: '1.5' })}>
                <label className={labelStyle}>NOMBRE</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div className={stack({ gap: '1.5' })}>
                <label className={labelStyle}>APELLIDO</label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div className={stack({ gap: '1.5' })}>
                <label className={labelStyle}>DNI / DOCUMENTO</label>
                <input
                  type="text"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Card: Información Laboral (CRM Specific) */}
          <div className={cardStyle}>
            <div className={cardHeaderStyle}>
              <Briefcase size={18} className={css({ color: 'indigo.600' })} />
              <h2 className={cardTitleStyle}>Información Laboral</h2>
            </div>
            <div
              className={css({
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '4'
              })}
            >
              <div className={stack({ gap: '1.5' })}>
                <label className={labelStyle}>PUESTO / CARGO</label>
                <input
                  type="text"
                  name="puesto"
                  value={formData.puesto}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div className={stack({ gap: '1.5' })}>
                <label className={labelStyle}>DEPARTAMENTO / EQUIPO</label>
                <input
                  type="text"
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
              <div className={stack({ gap: '1.5' })}>
                <label className={labelStyle}>ROL EN SISTEMA</label>
                <input
                  type="text"
                  value={formData.rolSistema}
                  disabled
                  className={`${inputStyle} ${disabledInputStyle}`}
                />
              </div>
            </div>
          </div>

          {/* Card: Contacto y Ubicación */}
          <div className={cardStyle}>
            <div className={cardHeaderStyle}>
              <MapPin size={18} className={css({ color: 'red.500' })} />
              <h2 className={cardTitleStyle}>Contacto y Ubicación</h2>
            </div>
            <div className={stack({ gap: '4' })}>
              <div
                className={css({
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '4'
                })}
              >
                <div className={stack({ gap: '1.5' })}>
                  <label className={labelStyle}>
                    CORREO ELECTRÓNICO LABORAL
                  </label>
                  <div className={css({ position: 'relative' })}>
                    <Mail size={16} className={iconInputStyle} />
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className={`${inputStyle} ${disabledInputStyle} ${css({ pl: '9' })}`}
                    />
                  </div>
                </div>
                <div
                  className={css({
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '4'
                  })}
                >
                  <div className={stack({ gap: '1.5' })}>
                    <label className={labelStyle}>TELÉFONO MÓVIL</label>
                    <div className={css({ position: 'relative' })}>
                      <Smartphone size={16} className={iconInputStyle} />
                      <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className={`${inputStyle} ${css({ pl: '9' })}`}
                      />
                    </div>
                  </div>
                  <div className={stack({ gap: '1.5' })}>
                    <label className={labelStyle}>
                      TEL. INTERNO (Opcional)
                    </label>
                    <input
                      type="text"
                      name="telefonoAlternativo"
                      value={formData.telefonoAlternativo}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                  </div>
                </div>
              </div>

              <div
                className={css({
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr',
                  gap: '4'
                })}
              >
                <div className={stack({ gap: '1.5' })}>
                  <label className={labelStyle}>
                    DIRECCIÓN LABORAL / SUCURSAL
                  </label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>
                <div className={stack({ gap: '1.5' })}>
                  <label className={labelStyle}>CIUDAD</label>
                  <input
                    type="text"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>
                <div className={stack({ gap: '1.5' })}>
                  <label className={labelStyle}>PAÍS</label>
                  <input
                    type="text"
                    name="pais"
                    value={formData.pais}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card: Seguridad */}
          <div className={cardStyle}>
            <div className={cardHeaderStyle}>
              <Shield size={18} className={css({ color: 'green.600' })} />
              <h2 className={cardTitleStyle}>Seguridad y Accesos</h2>
            </div>
            <div className={stack({ gap: '4' })}>
              <div
                className={css({
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '4'
                })}
              >
                <div className={stack({ gap: '1.5' })}>
                  <label className={labelStyle}>CONTRASEÑA ACTUAL</label>
                  <input
                    type="password"
                    name="passwordActual"
                    placeholder="••••••••"
                    value={formData.passwordActual}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>
                <div className={stack({ gap: '1.5' })}>
                  <label className={labelStyle}>NUEVA CONTRASEÑA</label>
                  <input
                    type="password"
                    name="nuevaPassword"
                    placeholder="Mínimo 8 caracteres"
                    value={formData.nuevaPassword}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>
                <div className={stack({ gap: '1.5' })}>
                  <label className={labelStyle}>REPETIR NUEVA CONTRASEÑA</label>
                  <input
                    type="password"
                    placeholder="Repetí la contraseña"
                    className={inputStyle}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Avatar, Preferencias y Stats */}
        <div className={stack({ gap: '6' })}>
          {/* Card: Foto de Perfil */}
          <div className={cardStyle}>
            <div className={cardHeaderStyle}>
              <ImageIcon size={18} className={css({ color: 'purple.600' })} />
              <h2 className={cardTitleStyle}>Foto de Perfil</h2>
            </div>

            <div className={stack({ gap: '4', alignItems: 'center' })}>
              <div
                className={center({
                  w: 'full',
                  h: '180px',
                  border: '2px dashed',
                  borderColor: 'gray.300',
                  borderRadius: 'xl',
                  bgColor: 'gray.50',
                  flexDir: 'column',
                  gap: '2',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  _hover: { borderColor: 'blue.400', bgColor: 'blue.50/50' }
                })}
              >
                <div
                  className={center({
                    w: '12',
                    h: '12',
                    bgColor: 'white',
                    borderRadius: 'full',
                    boxShadow: 'sm'
                  })}
                >
                  <Camera size={20} className={css({ color: 'gray.500' })} />
                </div>
                <span
                  className={css({
                    fontSize: 'sm',
                    fontWeight: '600',
                    color: 'gray.600'
                  })}
                >
                  SUBIR IMAGEN
                </span>
              </div>
              <p
                className={css({
                  fontSize: 'xs',
                  color: 'gray.400',
                  textAlign: 'center'
                })}
              >
                Formatos: JPG, PNG. Máx 2MB.
                <br />
                Para uso interno en el CRM.
              </p>
            </div>
          </div>

          {/* Card: Notificaciones */}
          <div className={cardStyle}>
            <div className={cardHeaderStyle}>
              <Bell size={18} className={css({ color: 'orange.500' })} />
              <h2 className={cardTitleStyle}>Notificaciones</h2>
            </div>

            <div className={stack({ gap: '4' })}>
              <div className={hstack({ justifyContent: 'space-between' })}>
                <div className={stack({ gap: '0' })}>
                  <span
                    className={css({
                      fontSize: 'sm',
                      fontWeight: '600',
                      color: 'gray.700'
                    })}
                  >
                    Correos de sistema
                  </span>
                  <span className={css({ fontSize: 'xs', color: 'gray.500' })}>
                    Alertas de seguridad y reportes
                  </span>
                </div>
                <ToggleSwitch
                  checked={formData.notificacionesEmail}
                  onChange={() => handleToggle('notificacionesEmail')}
                />
              </div>

              <div
                className={css({ h: '1px', w: 'full', bgColor: 'gray.100' })}
              />

              <div className={hstack({ justifyContent: 'space-between' })}>
                <div className={stack({ gap: '0' })}>
                  <span
                    className={css({
                      fontSize: 'sm',
                      fontWeight: '600',
                      color: 'gray.700'
                    })}
                  >
                    Notificaciones In-App
                  </span>
                  <span className={css({ fontSize: 'xs', color: 'gray.500' })}>
                    Menciones, asignación de tareas
                  </span>
                </div>
                <ToggleSwitch
                  checked={formData.notificacionesSistema}
                  onChange={() => handleToggle('notificacionesSistema')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Componente Auxiliar para los Toggles ---
function ToggleSwitch({
  checked,
  onChange
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={css({
        w: '10',
        h: '5',
        borderRadius: 'full',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        backgroundColor: checked ? 'blue.600' : 'gray.300',
        flexShrink: 0
      })}
    >
      <div
        className={css({
          w: '4',
          h: '4',
          bgColor: 'white',
          borderRadius: 'full',
          position: 'absolute',
          top: '0.5',
          transition: 'transform 0.2s',
          transform: checked ? 'translateX(22px)' : 'translateX(2px)'
        })}
      />
    </button>
  );
}

const cardStyle = css({
  bgColor: 'white',
  borderRadius: '2xl',
  border: '1px solid',
  borderColor: 'gray.200',
  p: '5',
  boxShadow: 'sm'
});

const cardHeaderStyle = hstack({
  gap: '2',
  mb: '5',
  pb: '3',
  borderBottom: '1px solid',
  borderBottomColor: 'gray.100'
});

const cardTitleStyle = css({
  fontSize: 'md',
  fontWeight: '700',
  color: '#1A365D'
});

const labelStyle = css({
  fontSize: '10px',
  fontWeight: 'bold',
  color: 'gray.500',
  textTransform: 'uppercase',
  letterSpacing: 'wider'
});

const inputStyle = css({
  w: 'full',
  p: '2.5',
  bgColor: 'white',
  border: '1px solid',
  borderColor: 'gray.200',
  borderRadius: 'xl',
  fontSize: 'sm',
  color: 'gray.800',
  outline: 'none',
  transition: 'all 0.2s',
  _focus: {
    borderColor: 'blue.400',
    boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.2)'
  }
});

const disabledInputStyle = css({
  bgColor: 'gray.50',
  color: 'gray.500',
  cursor: 'not-allowed',
  _focus: { borderColor: 'gray.200', boxShadow: 'none' }
});

const iconInputStyle = css({
  position: 'absolute',
  left: '3',
  top: '50%',
  transform: 'translateY(-50%)',
  color: 'gray.400'
});
