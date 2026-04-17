import { css } from '@/styled-system/css';
import { center } from '@/styled-system/patterns';
import { LoginForm } from '@/features/login/components/LoginForm';
import { useLogin } from '@/features/login/hooks/useLogin';

export function LoginPage() {
  const { login, error } = useLogin();

  return (
    <div
      className={css({
        height: '100vh',
        width: 'full',
        bgColor: '#F4F7F6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: '5',
        backgroundImage: 'url("/images/login-bg.jpeg")',
        backgroundSize: 'cover', // Para que la imagen cubra toda la sección
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      })}
    >
      <section
        className={css({
          width: 'full',
          height: 'full',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgColor: 'white',
          maxWidth: '400px',
          rounded: 'md',
          maxHeight: '600px',
          boxShadow: 'xl',
          paddingTop: '5'
        })}
      >
        {/* <h1
          className={css({
            fontSize: '48px',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '60px',
            marginTop: '100px',
            color: 'blue.600'
          })}
        >
          Leadify
        </h1> */}
        <div
          className={css({
            fontSize: '4xl',
            fontWeight: '800',
            color: '#1A365D'
          })}
        >
          Lead<span className={css({ color: 'blue.500' })}>ify</span>
        </div>
        <LoginForm onSubmit={login} error={error} />
      </section>
    </div>
  );
}
