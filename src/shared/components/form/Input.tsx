import { forwardRef, type InputHTMLAttributes } from 'react';
import { css } from '@/styled-system/css';
import { stack } from '@/styled-system/patterns';
import { Label } from '@/shared/components/form/Label';
import { input } from '@/shared/styles/input';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={stack({ width: '100%' })}>
        {label && <Label>{label}</Label>}
        <input ref={ref} className={input()} {...props} />

        {error && (
          <span
            className={css({
              fontSize: 'xs',
              color: 'red.500',
              fontWeight: 'medium'
            })}
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);
