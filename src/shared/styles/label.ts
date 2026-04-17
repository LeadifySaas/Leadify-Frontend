// styles/input.ts
import { cva } from '@/styled-system/css'

export const label = cva({
    base: {

        color: 'text.primary',


    },

    variants: {
        variant: {
            default: {


            },

        },

        size: {
            sm: {

                fontSize: 'sm',
            },
            md: {
                fontSize: 'md',
            },
            lg: {
                fontSize: 'lg',
            },
        },
    },

    defaultVariants: {
        variant: 'default',
        size: 'sm',
    },
})