import '@/app/styles/reset.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./providers/routers/AppRouter";

const App = () => {

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App