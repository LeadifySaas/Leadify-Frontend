import { useState, useEffect } from 'react';
import { useAuthStore } from '@/shared/store/auth.store';
import { loginRequest } from '../api/auth.service';
import { useNavigate } from '@tanstack/react-router';
import { css } from '@/styled-system/css';
import { stack, center, hstack } from '@/styled-system/patterns';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const setToken = useAuthStore((state) => state.setToken);
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem('remembered_email');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        // 1. Detener absolutamente todo inmediatamente
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        console.log("Submit presionado"); // LOG DE CONTROL
        setError('');
        setIsLoading(true);

        try {
            const data = await loginRequest(email, password);
            console.log("Respuesta login:", data); // LOG DE CONTROL

            if (data?.token) {
                if (rememberMe) localStorage.setItem('remembered_email', email);
                else localStorage.removeItem('remembered_email');

                setToken(data.token);

                // Usamos un pequeño delay para que Zustand guarde bien el token antes de movernos
                setTimeout(() => {
                    navigate({ to: '/' });
                }, 100);
            }
        } catch (err: any) {
            console.error("EL ERROR ES ESTE:", err); // MIRA ESTO EN LA CONSOLA

            const msg = err.response?.data?.message
                || err.response?.data
                || err.message
                || 'Error desconocido';

            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={center({ height: '100vh', width: '100vw', bgColor: '#F4F7F6' })}>
            <div className={css({ width: '420px', p: '48px', bgColor: 'white', borderRadius: '2xl', boxShadow: 'lg' })}>
                <form onSubmit={handleSubmit} className={stack({ gap: '5' })}>
                    <h1 className={css({ fontSize: '3xl', fontWeight: 'bold', textAlign: 'center' })}>Leadify</h1>

                    <input
                        type="email" value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="Email" required
                        className={css({ p: '3', border: '1px solid #ccc', borderRadius: 'md' })}
                    />

                    <input
                        type="password" value={password} onChange={e => setPassword(e.target.value)}
                        placeholder="Password" required
                        className={css({ p: '3', border: '1px solid #ccc', borderRadius: 'md' })}
                    />

                    <label className={hstack({ gap: '2', fontSize: 'sm' })}>
                        <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
                        Recordarme
                    </label>

                    {error && (
                        <div className={css({ p: '2', bgColor: 'red.50', color: 'red.600', borderRadius: 'md', fontSize: 'xs' })}>
                            {error}
                        </div>
                    )}

                    <button type="submit" disabled={isLoading} className={css({ p: '3', bgColor: '#38A169', color: 'white', borderRadius: 'md', cursor: 'pointer' })}>
                        {isLoading ? 'Entrando...' : 'Acceder'}
                    </button>
                </form>
            </div>
        </div>
    );
}