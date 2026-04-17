import { useState, forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/shared/components/form/Input';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div style={{ position: 'relative', width: '100%' }}>
        <Input
          ref={ref}
          label={label}
          type={showPassword ? 'text' : 'password'}
          error={error}
          {...props}
        />

        {/* Icono */}
        <div
          style={{
            position: 'absolute',
            right: '15px',
            top: label ? '58px' : '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer'
          }}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff size={18} opacity={'50%'} />
          ) : (
            <Eye size={18} opacity={'50%'} />
          )}
        </div>
      </div>
    );
  }
);
