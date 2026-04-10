import { css } from '../styled-system/css';
import type { ReactNode } from 'react';
import { useAuthStore } from '@/shared/store/auth.store';

function App({ children }: { children: ReactNode }) {
  const token = useAuthStore((state) => state.token);

  return (
    <div
      className={css({
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        bgColor: '#F4F7F6',
        color: '#1A365D',
        fontFamily: 'sans-serif'
      })}
    >
      {token && (
        <aside className={css({
          width: '260px',
          bgColor: '#1A365D',
          color: 'white',
          boxShadow: 'xl'
        })}>
          <div className={css({ p: '25px', fontSize: 'xl', fontWeight: 'bold', borderBottom: '1px solid #2D4A77' })}>
            Leadify CRM
          </div>
        </aside>
      )}

      <main className={css({
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      })}>
        {children}
      </main>
    </div>
  );
}

export default App;