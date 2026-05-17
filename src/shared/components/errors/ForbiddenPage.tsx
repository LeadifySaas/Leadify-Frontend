import { Link } from '@tanstack/react-router';
import { css } from '@/styled-system/css';
import { center, stack, vstack } from '@/styled-system/patterns';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export function ForbiddenPage() {
    return (
        <div className={center({ w: 'full', h: 'full', minH: '80vh', p: '6' })}>
            <div className={vstack({ 
                gap: '6', 
                maxWidth: 'md', 
                textAlign: 'center',
                p: '10',
                bgColor: 'white',
                borderRadius: '2xl',
                shadow: 'xl',
                border: '1px solid',
                borderColor: 'red.50'
            })}>
                <div className={center({ 
                    w: '20', h: '20', 
                    borderRadius: 'full', 
                    bgColor: 'red.50',
                    color: 'red.500',
                    mb: '2'
                })}>
                    <ShieldAlert size={40} strokeWidth={1.5} />
                </div>
                
                <div className={stack({ gap: '2' })}>
                    <h1 className={css({ 
                        fontSize: '3xl', 
                        fontWeight: '800', 
                        color: 'slate.800',
                        letterSpacing: 'tight'
                    })}>
                        Acceso Denegado
                    </h1>
                    <p className={css({ color: 'gray.500', fontSize: 'md', lineHeight: 'relaxed' })}>
                        No tienes los permisos necesarios para visualizar este módulo. Si crees que esto es un error, por favor contacta al administrador del sistema.
                    </p>
                </div>

                <Link 
                    to="/" 
                    className={css({ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '2',
                        mt: '4',
                        px: '6', 
                        py: '3', 
                        bgColor: 'slate.800', 
                        color: 'white', 
                        borderRadius: 'lg', 
                        fontWeight: '600',
                        shadow: 'md',
                        transition: 'all 0.2s ease',
                        _hover: { 
                            bgColor: 'slate.900', 
                            transform: 'translateY(-2px)',
                            shadow: 'lg'
                        } 
                    })}
                >
                    <ArrowLeft size={18} />
                    Volver al Dashboard
                </Link>
            </div>
        </div>
    );
}
