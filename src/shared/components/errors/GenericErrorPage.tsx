import { css } from '@/styled-system/css';
import { center, stack, vstack } from '@/styled-system/patterns';
import { ServerCrash, RefreshCcw } from 'lucide-react';

export function GenericErrorPage({ error }: { error?: Error }) {
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
                borderColor: 'orange.100'
            })}>
                <div className={center({ 
                    w: '20', h: '20', 
                    borderRadius: 'full', 
                    bgColor: 'orange.50',
                    color: 'orange.500',
                    mb: '2'
                })}>
                    <ServerCrash size={40} strokeWidth={1.5} />
                </div>
                
                <div className={stack({ gap: '2' })}>
                    <h1 className={css({ 
                        fontSize: '3xl', 
                        fontWeight: '800', 
                        color: 'slate.800',
                        letterSpacing: 'tight'
                    })}>
                        Error Inesperado
                    </h1>
                    <p className={css({ color: 'gray.500', fontSize: 'md', lineHeight: 'relaxed' })}>
                        Ocurrió un problema de nuestro lado impidiendo procesar tu solicitud. Estamos trabajando para solucionarlo.
                    </p>
                    {error && (
                        <p className={css({ mt: '2', fontSize: 'xs', color: 'orange.600', bgColor: 'orange.50', p: '2', borderRadius: 'md', wordBreak: 'break-all' })}>
                            {error.message}
                        </p>
                    )}
                </div>

                <button 
                    onClick={() => window.location.reload()}
                    className={css({ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '2',
                        mt: '4',
                        px: '6', 
                        py: '3', 
                        bgColor: 'orange.500', 
                        color: 'white', 
                        borderRadius: 'lg', 
                        fontWeight: '600',
                        shadow: 'md',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        _hover: { 
                            bgColor: 'orange.600', 
                            transform: 'translateY(-2px)',
                            shadow: 'lg'
                        } 
                    })}
                >
                    <RefreshCcw size={18} />
                    Recargar Página
                </button>
            </div>
        </div>
    );
}
