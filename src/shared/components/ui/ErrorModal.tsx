import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { css } from '../../../../styled-system/css';
import { hstack, stack, center } from '../../../../styled-system/patterns';
import { XCircle } from 'lucide-react';

interface ErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
}

export function ErrorModal({ isOpen, onClose, title, description }: ErrorModalProps) {
    return (
        <AlertDialog.Root open={isOpen}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className={overlayStyle} />
                <AlertDialog.Content className={contentStyle}>
                    <div className={stack({ gap: '4', textAlign: 'center' })}>
                        <center className={iconContainerStyle}>
                            <XCircle size={40} />
                        </center>

                        <div>
                            <AlertDialog.Title className={titleStyle}>{title}</AlertDialog.Title>
                            <AlertDialog.Description className={descriptionStyle}>
                                {description}
                            </AlertDialog.Description>
                        </div>

                        <div className={center({ mt: '4' })}>
                            <button onClick={onClose} className={btnConfirmStyle}>
                                Volver al Formulario
                            </button>
                        </div>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}

// Estilos Panda CSS
const overlayStyle = css({ bgColor: 'blackAlpha.600', position: 'fixed', inset: 0, backdropFilter: 'blur(4px)', zIndex: 1000 });
const contentStyle = css({ bgColor: 'white', borderRadius: '2xl', boxShadow: '2xl', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', w: '90vw', maxW: '400px', p: '8', zIndex: 1001 });
const iconContainerStyle = center({ mb: '2', color: 'red.500', p: '4', bgColor: 'red.50', w: 'fit-content', mx: 'auto', borderRadius: 'full' });
const titleStyle = css({ fontSize: 'xl', fontWeight: '800', color: 'gray.800' });
const descriptionStyle = css({ color: 'gray.500', fontSize: 'sm', mt: '2' });
const btnConfirmStyle = css({ px: '8', py: '2.5', borderRadius: 'xl', fontWeight: 'bold', color: 'white', bgColor: 'red.500', cursor: 'pointer', _hover: { bgColor: 'red.600' } });