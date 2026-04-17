import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/shared/store/auth.store'
import { loginRequest } from '@/features/login/api/login.service'
import type { LoginFormValues } from '@/features/login/schemas'

type AxiosLikeError = {
    response?: {
        data?: {
            message?: string
        }
    }
}

export function useLogin() {
    const [error, setError] = useState('')

    const setToken = useAuthStore((s) => s.setToken)
    const navigate = useNavigate()

    const login = async (data: LoginFormValues) => {
        setError('')

        try {
            const response = await loginRequest({ email: data.email, password: data.password })

            if (response?.token) {
                if (data.rememberMe) {
                    localStorage.setItem('remembered_email', data.email)
                } else {
                    localStorage.removeItem('remembered_email')
                }

                setToken(response.token)
                navigate({ to: '/' })
            }
        } catch (err: unknown) {
            let message = 'Ocurrió un error inesperado al iniciar sesión.'

            if (err instanceof Error) {
                message = err.message
            } else if (typeof err === 'object' && err !== null) {
                const axiosError = err as AxiosLikeError
                message =
                    axiosError.response?.data?.message ||
                    message
            }

            setError(message)
        }
    }

    return { login, error }
}