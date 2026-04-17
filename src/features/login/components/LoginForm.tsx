import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { css } from '@/styled-system/css';
import { stack, hstack } from '@/styled-system/patterns';
import {
  loginSchema,
  type LoginFormValues
} from '@/features/login/schemas/login.schema';
import { Input } from '@/shared/components/form/Input';
import { PasswordInput } from '@/shared/components/form/InputPassword';

type Props = {
  onSubmit: (data: LoginFormValues) => void;
  error: string;
};

export function LoginForm({ onSubmit, error }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  /* Cargar email guardado al montar */
  useEffect(() => {
    const savedEmail = localStorage.getItem('remembered_email');
    if (savedEmail) {
      setValue('email', savedEmail);
      setValue('rememberMe', true);
    }
  }, [setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={css({
        width: 'full',
        height: 'full',
        display: 'flex',
        flexDir: 'column',
        justifyContent: 'space-between',
        gap: '2',
        p: '10'
      })}
    >
      <h2
        className={css({
          fontSize: '3xl',
          fontWeight: '500',
          textAlign: 'center',
          color: 'gray.800'
        })}
      >
        Bienvenido
      </h2>

      <p
        className={css({
          fontSize: 'md',
          textAlign: 'center',
          color: 'text.secondary'
        })}
      >
        Ingresa tus datos para acceder a tu cuenta
      </p>
      <div
        className={css({
          width: 'full',
          bgColor: 'gray.100',
          height: '2px',
          my: '20px'
        })}
      ></div>
      {/* EMAIL */}
      <Input
        label="Correo electrónico"
        type="email"
        placeholder="ejemplo@leadify.com"
        error={errors.email?.message}
        {...register('email')}
      />

      {/* PASSWORD */}
      <PasswordInput
        label="Contraseña"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password')}
      />

      <div
        className={css({
          width: 'full',
          display: 'flex',
          justifyContent: 'space-between'
        })}
      >
        <label
          className={hstack({
            gap: '2',
            fontSize: 'sm',
            cursor: 'pointer',
            userSelect: 'none',
            color: 'gray.600',
            width: 'fit-content'
          })}
        >
          <input
            type="checkbox"
            {...register('rememberMe')}
            className={css({ cursor: 'pointer', bgColor: 'blue.600' })}
          />
          Recordarme
        </label>
        {/* <label
          className={hstack({
            gap: '2',
            fontSize: 'sm',
            cursor: 'pointer',
            userSelect: 'none',
            color: 'blue.600',
            width: 'fit-content'
          })}
        >
          Olvidaste tu contraseña?
        </label> */}
      </div>
      {/* REMEMBER ME */}

      {/* ERROR GLOBAL DEL SERVIDOR */}
      {error && (
        <div
          className={css({
            color: 'red.600',
            fontSize: 'xs',
            borderColor: 'red.200',
            textAlign: 'center'
          })}
        >
          {error}
        </div>
      )}

      {/* BOTÓN DE ACCESO */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={css({
          p: '3',
          mt: '7',
          bgColor: 'blue.600',
          color: 'white',
          fontWeight: '400',
          borderRadius: 'lg',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          opacity: isSubmitting ? 0.7 : 1,
          transition: 'all 0.2s',
          width: 'full',
          _hover: {},
          _active: {
            transform: isSubmitting ? 'none' : 'scale(0.98)'
          }
        })}
      >
        {isSubmitting ? 'Entrando...' : 'Acceder'}
      </button>
    </form>
  );
}
