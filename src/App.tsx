import { css } from '../styled-system/css';
function App() {
  return (
    <h1
      className={css({
        bgColor: 'red.300',
        width: '100%',
        height: '100vh',
        display: 'grid',
        placeContent: 'center',
        fontSize: '32px'
      })}
    >
      Welcome to Leadify, negros pobres
    </h1>
  );
}

export default App;
