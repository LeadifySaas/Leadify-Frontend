import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { css } from '../../../styled-system/css';
import { stack, hstack, center } from '../../../styled-system/patterns';
import { useAuthStore } from '@/shared/store/auth.store';
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

const IconResolver = ({ name, size }: { name?: string; size: number }) => {
    switch (name) {
        case 'LayoutDashboard': return <LayoutDashboard size={size} />;
        case 'Settings': return <Settings size={size} />;
        case 'FileText': return <FileText size={size} />;
        case 'ShieldCheck': return <ShieldCheck size={size} />;
        case 'Box': return <Box size={size} />;
        default: return <Box size={size} />;
    }
};

export function Sidebar() {
    // Estado para colapsar todo el sidebar
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { menuItems } = useAuthStore();

    return (
        <aside className={css({
            width: isCollapsed ? '80px' : '260px',
            height: '100vh',
            position: 'sticky',
            top: 0,
            bgColor: 'white',
            borderRight: '1px solid',
            borderColor: 'gray.100',
            p: isCollapsed ? '4' : '6',
            transition: 'width 0.3s ease'
        })}>
            <div className={stack({ gap: '8' })}>
                {/* Logo y Botón de Colapso */}
                <div className={hstack({ justifyContent: isCollapsed ? 'center' : 'space-between', alignItems: 'center' })}>
                    {!isCollapsed && (
                        <div className={css({ fontSize: '2xl', fontWeight: '800', color: '#1A365D' })}>
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

                <nav className={stack({ gap: '2' })}>
                    {menuItems.map((menu: any, idx: number) => {
                        // Si el menú tiene submenús, renderizamos un NavGroup
                        if (menu.subMenues && menu.subMenues.length > 0) {
                            return (
                                <NavGroup
                                    key={idx}
                                    icon={<IconResolver name={menu.icono} size={18} />}
                                    label={menu.nombre}
                                    isCollapsed={isCollapsed}
                                    links={menu.subMenues.map((sm: any) => ({
                                        to: sm.ruta || '#',
                                        label: sm.nombre
                                    }))}
                                />
                            );
                        }

                        // Si no tiene submenús, es un NavItem directo
                        return (
                            <NavItem
                                key={idx}
                                to={menu.ruta || '#'}
                                icon={<IconResolver name={menu.icono} size={18} />}
                                label={menu.nombre}
                                isCollapsed={isCollapsed}
                            />
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}

function NavItem({ to, icon, label, isCollapsed }: { to: string, icon: any, label: string, isCollapsed: boolean }) {
    return (
        <Link to={to as any} className={css({
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
            "&.active": { bgColor: 'blue.50', color: 'blue.700', fontWeight: '600' }
        })}>
            {icon}
            {!isCollapsed && <span>{label}</span>}
        </Link>
    );
}

function NavGroup({ icon, label, links, isCollapsed }: { icon: any, label: string, links: { to: string, label: string }[], isCollapsed: boolean }) {
    console.log(`Links en ${label}:`, links);
    const [isOpen, setIsOpen] = useState(false);

    // Si el sidebar está colapsado, no mostramos el submenú abierto
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
                    _hover: isCollapsed ? {} : { bgColor: 'gray.50' },
                    color: 'gray.600'
                })}
            >
                <div className={hstack({ gap: '3' })}>
                    {icon}
                    {!isCollapsed && <span className={css({ fontSize: 'sm', fontWeight: '500' })}>{label}</span>}
                </div>
                {!isCollapsed && <ChevronDown size={14} className={css({ transform: isOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' })} />}
            </div>

            {showMenu && (
                <div className={stack({ ml: '9', borderLeft: '1px solid', borderColor: 'gray.100', gap: '1' })}>
                    {links.map((link, i) => (
                        <Link key={i} to={link.to as any} className={css({
                            p: '2',
                            pl: '4',
                            fontSize: 'xs',
                            color: 'gray.500',
                            transition: '0.2s',
                            _hover: { color: 'blue.600' },
                            "&.active": { color: 'blue.700', fontWeight: '600' }
                        })}>
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}