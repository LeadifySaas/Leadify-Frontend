import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/shared/store/auth.store'
import { loginRequest } from '@/features/login/api/login.service'
import type { LoginFormValues } from '@/features/login/schemas'
import { jwtDecode } from 'jwt-decode'
import { rolesService } from '@/features/roles/services/roles.service'
import { mergeMenuConPermisos } from '@/shared/lib/mergeMenuPermisos'

type AxiosLikeError = {
    response?: {
        data?: {
            message?: string
        }
    }
}

export function useLogin() {
    const [error, setError] = useState('')
    const setAuth = useAuthStore((s) => s.setAuth)
    const navigate = useNavigate()

    const login = async (data: LoginFormValues) => {
        setError('')
        try {
            const response = await loginRequest({ email: data.email, password: data.password })

            if (response?.token) {
                const decoded: any = jwtDecode(response.token);
                const idPerfil = Number(decoded.RolId);

                // Obtenemos menú y permisos en paralelo para combinar ambos
                const [menuResponse, permisosResponse] = await Promise.all([
                    rolesService.getMenuHierarchy(idPerfil),
                    rolesService.getPermisos(idPerfil),
                ]);

                // Mezclamos: menú con iconos/jerarquía + flags CRUD de permisos
                const merged = mergeMenuConPermisos(menuResponse.data, permisosResponse.data);
                setAuth(response.token, merged);

                if (data.rememberMe) {
                    localStorage.setItem('remembered_email', data.email)
                }

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
