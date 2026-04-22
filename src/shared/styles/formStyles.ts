import { css } from '../../../styled-system/css';

export const cardStyle = css({ p: '6', bgColor: 'white', borderRadius: '2xl', border: '1px solid', borderColor: 'gray.100', boxShadow: 'sm' });
export const sectionTitleStyle = css({ fontWeight: '800', color: '#1A365D', fontSize: 'md', mb: '4' });
export const labelStyle = css({ fontSize: 'xs', fontWeight: 'bold', color: 'gray.500', textTransform: 'uppercase', letterSpacing: 'wider', mb: '1.5' });
export const errorStyle = css({ color: 'red.500', fontSize: '10px', fontWeight: 'bold' });
export const inputStyle = css({ 
    p: '2.5', bgColor: 'gray.50', border: '1px solid', borderColor: 'gray.200',
    borderRadius: 'xl', fontSize: 'sm', outline: 'none', w: 'full',
    _focus: { borderColor: 'blue.400', bgColor: 'white' }
});
export const saveButtonStyle = css({ 
    px: '6', py: '2.5', bgColor: 'blue.600', color: 'white', 
    borderRadius: 'xl', fontWeight: 'bold', cursor: 'pointer',
    _hover: { bgColor: 'blue.700' }
});