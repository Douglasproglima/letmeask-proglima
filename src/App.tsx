import { createContext, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

export const TesteContext = createContext({} as any);

function App() {
  const [value, setValue] = useState('Teste Context UseState');

  return (
    <>
      <BrowserRouter>
        <TesteContext.Provider value={ {value, setValue} }>
          <Route path="/" exact component={ Home }/>
          <Route path="/rooms/new" component={ NewRoom }/>
        </TesteContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
