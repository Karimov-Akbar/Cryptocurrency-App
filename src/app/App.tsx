import '@/app/styles/reset.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./providers/routers/AppRouter";
import { CoinsProvider } from './providers/CoinsContext';

const App = () => {

  return (
    <CoinsProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </CoinsProvider>
  )
}

export default App