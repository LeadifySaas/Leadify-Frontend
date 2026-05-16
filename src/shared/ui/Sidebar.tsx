import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { css } from '../../../styled-system/css';
import { stack, hstack, center } from '../../../styled-system/patterns';
import {
  LayoutDashboard,
  Settings,
  ChevronDown,
  FileText,
  ShieldCheck,
  Menu,
  ChevronLeft,
  Box
} from 'lucide-react';
import { useAuthStore } from '@/features/login/stores/authStore';

const IconMap: Record<string, any> = {
  LayoutDashboard: <LayoutDashboard size={18} />,
  FileText: <FileText size={18} />,
  ShieldCheck: <ShieldCheck size={18} />,
  Box: <Box size={18} />,
  Settings: <Settings size={18} />
};

export function Sidebar() {
  const { menuItems } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={css({
        width: isCollapsed ? '80px' : '260px',
        height: '100vh',
        position: 'sticky',
        top: 0,
        bgColor: 'white',
        borderRight: '1px solid',
        borderRightColor: 'gray.200',
        p: isCollapsed ? '4' : '6',
        transition: 'width 0.3s ease'
      })}
    >
      <div className={stack({ gap: '8' })}>
        {/* Logo y Botón de Colapso */}
        <div
          className={hstack({
            justifyContent: isCollapsed ? 'center' : 'space-between',
            alignItems: 'center'
          })}
        >
          {!isCollapsed && (
            <div
              className={css({
                fontSize: '2xl',
                fontWeight: '800',
                color: '#1A365D'
              })}
            >
              Lead<span className={css({ color: 'blue.500' })}>ify</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={center({
              p: '2',
              borderRadius: 'md',
              cursor: 'pointer',
              _hover: { bgColor: 'gray.100' },
              color: 'gray.500'
            })}
          >
            {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className={stack({ gap: '2.5' })}>
          {menuItems.map((item) => {
            // Si TIENE submenúes
            if (item.subMenues && item.subMenues.length > 0) {
              return (
                <NavGroup
                  key={item.idMenu}
                  icon={IconMap[item.icono] || <Box size={18} />}
                  label={item.nombre}
                  isCollapsed={isCollapsed}
                  links={item.subMenues.map((sub: any) => ({
                    to: sub.ruta,
                    label: sub.nombre
                  }))}
                />
              );
            }

            // Si NO tiene submenúes
            return (
              <NavItem
                key={item.idMenu}
                to={item.ruta}
                icon={IconMap[item.icono] || <Box size={18} />}
                label={item.nombre}
                isCollapsed={isCollapsed}
              />
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

function NavItem({
  to,
  icon,
  label,
  isCollapsed
}: {
  to: string;
  icon: any;
  label: string;
  isCollapsed: boolean;
}) {
  return (
    <Link
      to={to as any}
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'flex-start',
        gap: '3',
        p: '3',
        borderRadius: 'lg',
        fontSize: 'sm',
        fontWeight: '500',
        color: 'gray.600',
        transition: '0.2s',
        _hover: { bgColor: 'blue.50', color: 'blue.600' },
        '&.active': { bgColor: 'blue.50', color: 'blue.700', fontWeight: '600' }
      })}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
}

function NavGroup({
  icon,
  label,
  links,
  isCollapsed
}: {
  icon: any;
  label: string;
  links: { to: string; label: string }[];
  isCollapsed: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const showMenu = isOpen && !isCollapsed;

  return (
    <div className={stack({ gap: '1' })}>
      <div
        onClick={() => !isCollapsed && setIsOpen(!isOpen)}
        className={hstack({
          justifyContent: isCollapsed ? 'center' : 'space-between',
          p: '3',
          cursor: isCollapsed ? 'default' : 'pointer',
          borderRadius: 'lg',
          _hover: isCollapsed ? {} : { bgColor: 'gray.100' },
          color: 'gray.600',
          marginBottom: '10px'
        })}
      >
        <div className={hstack({ gap: '3' })}>
          {icon}
          {!isCollapsed && (
            <span className={css({ fontSize: 'sm', fontWeight: '500' })}>
              {label}
            </span>
          )}
        </div>
        {!isCollapsed && (
          <ChevronDown
            size={14}
            className={css({
              transform: isOpen ? 'rotate(180deg)' : 'none',
              transition: '0.2s'
            })}
          />
        )}
      </div>

      {showMenu && (
        <div
          className={stack({
            ml: '9',
            borderLeft: '1px solid',
            borderLeftColor: 'gray.300',
            gap: '1'
          })}
        >
          {links.map((link, i) => (
            <Link
              key={i}
              to={link.to as any}
              className={css({
                p: '2',
                pl: '4',
                fontSize: 'xs',
                color: 'gray.500',
                transition: '0.2s',
                _hover: { color: 'blue.600' },
                '&.active': { color: 'blue.700', fontWeight: '600' }
              })}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}