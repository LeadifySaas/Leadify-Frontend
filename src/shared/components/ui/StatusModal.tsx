import * as Dialog from '@radix-ui/react-dialog';
import { css } from '../../../../styled-system/css';
import { stack, center } from '../../../../styled-system/patterns';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

interface StatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    type: 'success' | 'error' | 'warning';
}

export function StatusModal({ isOpen, onClose, title, description, type }: StatusModalProps) {
    const icons = {
        success: <CheckCircle2 size={40} className={css({ color: 'green.500' })} />,
        error: <XCircle size={40} className={css({ color: 'red.500' })} />,
        warning: <AlertCircle size={40} className={css({ color: 'amber.500' })} />,
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className={overlayStyle} />
                <Dialog.Content className={contentStyle}>
                    <div className={stack({ gap: '4', textAlign: 'center' })}>
                        <div className={center()}>{icons[type]}</div>
                        <div>
                            <Dialog.Title className={titleStyle}>{title}</Dialog.Title>
                            <Dialog.Description className={descriptionStyle}>
                                {description}
                            </Dialog.Description>
                        </div>
                        <button onClick={onClose} className={btnConfirmStyle}>
                            Entendido
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

// Reutilizamos tus estilos de Panda
const overlayStyle = css({ bgColor: 'blackAlpha.600', position: 'fixed', inset: 0, backdropFilter: 'blur(4px)', zIndex: 1000 });
const contentStyle = css({ bgColor: 'white', borderRadius: '2xl', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', w: '90vw', maxW: '400px', p: '8', zIndex: 1001 });
const titleStyle = css({ fontSize: 'xl', fontWeight: '800', color: 'gray.800', mb: '2' });
const descriptionStyle = css({ color: 'gray.500', fontSize: 'sm' });
const btnConfirmStyle = css({ mt: '4', px: '4', py: '2.5', borderRadius: 'xl', fontWeight: 'bold', color: 'white', bgColor: 'blue.600', cursor: 'pointer', _hover: { bgColor: 'blue.700' } });