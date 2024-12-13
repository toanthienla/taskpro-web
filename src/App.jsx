import Board from './pages/Boards/_id';
import { ConfirmProvider } from 'material-ui-confirm';

function App() {

  return (
    <ConfirmProvider>
      <Board></Board>
    </ConfirmProvider>
  );
}


export default App;
