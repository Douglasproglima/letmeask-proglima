import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { NewRoom } from './pages/Rooms/NewRoom';
import { Room } from './pages/Rooms/Room';
import { AuthContextProvider } from './Contexts/AuthContext';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          { /* Switch: Se uma condição da rota for encontrada para de procurar outra rota */ }
          <Switch>
            <Route path="/" exact component={ Home }/>
            <Route path="/rooms/new" exact component={ NewRoom }/>
            <Route path="/rooms/:id" component={ Room }/>
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
