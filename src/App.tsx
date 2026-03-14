import { css } from '@/styled-system/css';
import type { ReactNode } from 'react';

function App({ children }: { children: ReactNode }) {
  return (
    <div
      className={css({
        bgColor: '#333',
        width: '100%',
        color: 'white',
        height: '100vh',
        display: 'grid',
        placeContent: 'center',
        fontSize: '56px',
        userSelect: 'none'
      })}
    >
      {children}
      El pobre es pobre porque quiere
    </div>
  );
}

export default App;
