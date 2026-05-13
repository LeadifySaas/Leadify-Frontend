import { css } from '@/styled-system/css';
import { hstack } from '@/styled-system/patterns';

export const styles = {
    card: css({
        p: '6',
        bgColor: 'white',
        borderRadius: '2xl',
        border: '1px solid',
        borderColor: 'gray.100',
        boxShadow: 'sm'
    }),
    sectionTitle: css({
        fontWeight: '800',
        color: '#1A365D',
        fontSize: 'md'
    }),
    label: css({
        fontSize: 'xs',
        fontWeight: 'bold',
        color: 'gray.500',
        textTransform: 'uppercase'
    }),
    input: css({
        p: '2.5',
        bgColor: 'gray.50',
        border: '1px solid',
        borderColor: 'gray.200',
        borderRadius: 'xl',
        fontSize: 'sm',
        w: 'full',
        outline: 'none',
        _focus: { borderColor: 'blue.400', bgColor: 'white' }
    }),
    error: css({
        color: 'red.500',
        fontSize: '10px',
        fontWeight: 'bold'
    }),
    saveBtn: hstack({
        px: '6',
        py: '2.5',
        bgColor: 'blue.600',
        color: 'white',
        borderRadius: 'xl',
        fontWeight: 'bold',
        cursor: 'pointer',
        _hover: { bgColor: 'blue.700' },
        _disabled: { opacity: 0.6, cursor: 'not-allowed' }
    })
};

export const toggleStyles = {
    container: css({ position: 'relative', display: 'inline-block', w: '44px', h: '24px', cursor: 'pointer' }),
    input: css({
        opacity: 0, w: 0, h: 0,
        _checked: { '& + span': { bgColor: 'blue.600', _before: { transform: 'translateX(20px)' } } }
    }),
    slider: css({
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, bgColor: 'gray.300', borderRadius: 'full', transition: '0.3s',
        _before: { content: '""', position: 'absolute', h: '18px', w: '18px', left: '3px', bottom: '3px', bgColor: 'white', borderRadius: 'full', transition: '0.3s', boxShadow: 'sm' }
    })
};