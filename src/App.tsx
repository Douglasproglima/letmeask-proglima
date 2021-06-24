import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from './Contexts/AuthContext';
import { Home } from './pages/Home';
import { NewRoom } from './pages/Rooms/NewRoom';
import { Room } from './pages/Rooms/Room';
import { AdminRoom } from './pages/AdminRoom';
import Page404 from './pages/NotFound';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          { /* Switch: Se uma condição da rota for encontrada para de procurar outra rota */ }
          <Switch>
            <Route path="/" exact component={ Home }/>
            <Route path="/rooms/new" exact component={ NewRoom }/>
            <Route path="/rooms/:id" component={Room} />
            
            <Route path="/admin/rooms/:id" component={AdminRoom} />
            <Route path="" component={ Page404 } />
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
