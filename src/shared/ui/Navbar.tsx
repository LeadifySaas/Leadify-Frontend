import { useState } from 'react';
import { useAuthStore } from '@/shared/store/auth.store';
import { css } from '../../../styled-system/css';
import { hstack, center } from '../../../styled-system/patterns';
import { LogOut, Bell, ChevronDown, User } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user); // Datos extraídos del token
  const navigate = useNavigate();

  // Si no hay nombre en el store, usamos un fallback
  const displayName = user?.email || 'Usuario';
  const initial = displayName.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  return (
    <header
      className={css({
        height: '70px',
        bgColor: 'white',
        borderBottom: '1px solid',
        borderBottomColor: 'gray.200',
        px: '8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10
      })}
    >
      {/* Espacio para breadcrumbs o título de sección si quisieras */}
      <div
        className={css({
          color: 'text.secondary',
          fontSize: 'sm',
          fontWeight: '500'
        })}
      >
        Panel de Control
      </div>

      <div className={hstack({ gap: '6' })}>
        <Bell
          size={20}
          className={css({
            color: 'gray.400',
            cursor: 'pointer',
            _hover: { color: 'blue.500' }
          })}
        />

        <div className={css({ position: 'relative' })}>
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={hstack({
              gap: '3',
              cursor: 'pointer',
              p: '2',
              borderRadius: 'md',
              _hover: { bgColor: 'gray.50' }
            })}
          >
            <div
              className={center({
                width: '38px',
                height: '38px',
                borderRadius: 'full',
                bgColor: 'blue.600',
                color: 'white',
                fontWeight: 'bold'
              })}
            >
              {initial}
            </div>

            <div className={css({ display: { base: 'none', md: 'block' } })}>
              <p
                className={css({
                  fontSize: 'sm',
                  fontWeight: '700',
                  color: 'gray.800',
                  lineHeight: 'none'
                })}
              >
                {displayName}
              </p>
              <p
                className={css({ fontSize: 'xs', color: 'gray.400', mt: '1' })}
              >
                Conectado
              </p>
            </div>
            <ChevronDown
              size={14}
              className={css({
                color: 'gray.400',
                transform: isDropdownOpen ? 'rotate(180deg)' : 'none',
                transition: '0.2s'
              })}
            />
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className={css({
                position: 'absolute',
                top: '55px',
                right: 0,
                width: '200px',
                bgColor: 'white',
                borderRadius: 'xl',
                boxShadow: '2xl',
                border: '1px solid',
                borderColor: 'gray.100',
                p: '2',
                animation: 'fadeIn 0.2s ease'
              })}
            >
              <div
                className={hstack({
                  p: '3',
                  gap: '3',
                  color: 'gray.600',
                  cursor: 'pointer',
                  borderRadius: 'lg',
                  _hover: { bgColor: 'gray.50' }
                })}
              >
                <User size={16} />{' '}
                <span className={css({ fontSize: 'sm' })}>Mi Perfil</span>
              </div>
              <hr className={css({ my: '1', borderColor: 'gray.50' })} />
              <div
                onClick={handleLogout}
                className={hstack({
                  p: '3',
                  gap: '3',
                  color: 'red.500',
                  cursor: 'pointer',
                  borderRadius: 'lg',
                  _hover: { bgColor: 'red.50' }
                })}
              >
                <LogOut size={16} />{' '}
                <span className={css({ fontSize: 'sm', fontWeight: '600' })}>
                  Cerrar Sesión
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
