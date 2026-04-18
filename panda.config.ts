import { defineConfig } from '@pandacss/dev'

export default defineConfig({
    preflight: true,

    theme: {
        extend: {
            tokens: {
                colors: {
                    text: {
                        primary: { value: '{colors.slate.900}' },
                        secondary: { value: '{colors.slate.600}' },
                        disabled: { value: '{colors.slate.400}' },
                    },

                    state: {
                        success: { value: '{colors.green.600}' },
                        progress: { value: '{colors.emerald.500}' },
                        warning: { value: '{colors.amber.500}' },
                        error: { value: '{colors.red.600}' },
                        info: { value: '{colors.blue.500}' },
                    },
                },
            },
        },
    },

    include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
    exclude: [],
    jsxFramework: 'react',
    outdir: 'styled-system',
})