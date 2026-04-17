import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { css } from '../../../../styled-system/css';
import { hstack, stack, center } from '../../../../styled-system/patterns';
import { AlertCircle } from 'lucide-react';
import { type ReactNode } from 'react';

interface Props {
    trigger: ReactNode;
    title: string;
    description: string;
    onConfirm: () => void;
    confirmText?: string;
    variant?: 'danger' | 'info';
}

export function ConfirmDialog({ trigger, title, description, onConfirm, confirmText = "Confirmar", variant = 'danger' }: Props) {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                {trigger}
            </AlertDialog.Trigger>

            <AlertDialog.Portal>
                {/* Overlay con desenfoque */}
                <AlertDialog.Overlay className={overlayStyle} />

                <AlertDialog.Content className={contentStyle}>
                    <div className={stack({ gap: '4', textAlign: 'center' })}>
                        <center className={iconContainerStyle}>
                            <AlertCircle size={32} />
                        </center>

                        <div>
                            <AlertDialog.Title className={titleStyle}>
                                {title}
                            </AlertDialog.Title>
                            <AlertDialog.Description className={descriptionStyle}>
                                {description}
                            </AlertDialog.Description>
                        </div>

                        <div className={hstack({ gap: '3', mt: '4', justifyContent: 'center' })}>
                            <AlertDialog.Cancel asChild>
                                <button className={btnCancelStyle}>Cancelar</button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action asChild>
                                <button onClick={onConfirm} className={variant === 'danger' ? btnDeleteStyle : btnConfirmStyle}>
                                    {confirmText}
                                </button>
                            </AlertDialog.Action>
                        </div>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}

// --- Estilos Panda CSS ---

const overlayStyle = css({
    bgColor: 'blackAlpha.600',
    position: 'fixed',
    inset: 0,
    backdropFilter: 'blur(4px)',
    zIndex: 1000,
    animation: 'fadeIn 0.2s ease-out'
});

const contentStyle = css({
    bgColor: 'white',
    borderRadius: '2xl',
    boxShadow: '2xl',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    w: '90vw',
    maxW: '400px',
    p: '8',
    zIndex: 1001,
    animation: 'scaleIn 0.2s ease-out',
    _focus: { outline: 'none' }
});

const iconContainerStyle = center({
    mb: '2',
    color: 'red.500',
    p: '4',
    bgColor: 'red.50',
    w: 'fit-content',
    mx: 'auto',
    borderRadius: 'full'
});

const titleStyle = css({ fontSize: 'xl', fontWeight: '800', color: 'gray.800' });
const descriptionStyle = css({ color: 'gray.500', fontSize: 'sm', lineHeight: 'relaxed' });

const btnCancelStyle = css({ px: '4', py: '2.5', borderRadius: 'xl', fontWeight: 'bold', color: 'gray.600', bgColor: 'gray.100', cursor: 'pointer', flex: 1, _hover: { bgColor: 'gray.200' } });
const btnDeleteStyle = css({ px: '4', py: '2.5', borderRadius: 'xl', fontWeight: 'bold', color: 'white', bgColor: 'red.500', cursor: 'pointer', flex: 1, _hover: { bgColor: 'red.600' } });
const btnConfirmStyle = css({ px: '4', py: '2.5', borderRadius: 'xl', fontWeight: 'bold', color: 'white', bgColor: 'blue.600', cursor: 'pointer', flex: 1, _hover: { bgColor: 'blue.700' } });