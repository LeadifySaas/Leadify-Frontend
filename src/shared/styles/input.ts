// styles/input.ts
import { cva } from '@/styled-system/css'

export const input = cva({
    base: {
        height: '14',
        width: '100%',
        borderRadius: 'lg',
        borderWidth: '1px',
        outline: 'none',
        color: 'text.primary',
        _placeholder: {
            color: 'text.disabled',
            fontWeight: '300'
        }
    },

    variants: {
        variant: {
            default: {
                borderColor: 'slate.300',
                _focus: {
                    borderColor: 'blue.600',
                },

            },
            error: {
                borderColor: 'state.error',

            },

        },

        size: {
            sm: {
                px: '4',
                fontSize: 'sm',
            },
            md: {
                px: '4',
                fontSize: 'md',
            },
            lg: {
                px: '4',
                fontSize: 'lg',
            },
        },
    },

    defaultVariants: {
        variant: 'default',
        size: 'md',
    },
})