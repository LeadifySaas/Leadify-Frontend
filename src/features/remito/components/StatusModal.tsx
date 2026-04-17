import { css } from '../../../../styled-system/css';
import { stack, center } from '../../../../styled-system/patterns';
import { X } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    currentStatus: string;
    onConfirm: (newStatus: string) => void;
    remitoNumero: string;
}

export function StatusModal({ isOpen, onClose, currentStatus, onConfirm, remitoNumero }: Props) {
    if (!isOpen) return null;

    const estados = ['Pendiente', 'Entregado', 'Anulado'];

    return (
        <div className={overlayStyle} onClick={onClose}>
            <div className={modalStyle} onClick={(e) => e.stopPropagation()}>
                <div className={headerStyle}>
                    <div>
                        <h3 className={css({ fontWeight: '900', fontSize: 'xl', color: 'gray.800' })}>Actualizar Estado</h3>
                        <p className={css({ fontSize: 'sm', color: 'gray.500', mt: '1' })}>Remito: <span className={css({ fontWeight: '700', color: 'blue.600' })}>{remitoNumero}</span></p>
                    </div>
                    <button onClick={onClose} className={css({ color: 'gray.400', cursor: 'pointer', _hover: { color: 'gray.600' } })}>
                        <X size={20} />
                    </button>
                </div>

                <div className={stack({ gap: '2', mt: '4' })}>
                    {estados.map((est) => (
                        <button
                            key={est}
                            onClick={() => onConfirm(est)}
                            className={optionStyle(currentStatus === est)}
                        >
                            <div className={dotStyle(est)} />
                            {est}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// --- Estilos ---
const overlayStyle = center({
    position: 'fixed', top: 0, left: 0, w: 'full', h: 'full',
    bgColor: 'blackAlpha.600', zIndex: 1000, backdropFilter: 'blur(2px)'
});

const modalStyle = css({
    bgColor: 'white', p: '8', borderRadius: '3xl', shadow: '2xl', w: 'full', maxW: '420px',
    animation: 'fadeIn 0.2s ease-out'
});

const headerStyle = css({ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '6' });

const optionStyle = (isActive: boolean) => css({
    display: 'flex', alignItems: 'center', gap: '4',
    w: 'full', p: '5', borderRadius: '2xl', border: '1px solid',
    borderColor: isActive ? 'blue.300' : 'gray.100',
    bgColor: isActive ? 'blue.50' : 'transparent',
    color: isActive ? 'blue.700' : 'gray.600',
    fontWeight: isActive ? '800' : '600',
    fontSize: 'md',
    cursor: 'pointer', transition: 'all 0.2s',
    shadow: isActive ? 'sm' : 'none',
    _hover: { bgColor: isActive ? 'blue.50' : 'gray.50', transform: 'translateY(-1px)' }
});

const dotStyle = (status: string) => {
    const baseDot = { w: '2.5', h: '2.5', borderRadius: 'full' } as const;

    switch (status) {
        case 'Entregado':
            return css({ ...baseDot, bgColor: 'green.600' });
        case 'Anulado':
            return css({ ...baseDot, bgColor: 'red.600' });
        case 'Pendiente':
        default:
            return css({ ...baseDot, bgColor: 'amber.500' });
    }
};