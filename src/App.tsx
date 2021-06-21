import { Button } from './components/Button';
import { Input } from './components/Input';

function App() {
  return (
    <>
      <h1>Hello World</h1>
      <Input width={ 50 } />
      <div />
      <Input placeHolder="Seu nome aqui" />
      <div />
      <Input placeHolder="Sua idade" width={ 80 } />
      <div />
      <Button text="Botão 1"/>
      <div />
      <Button>Cancelar</Button>
    </>
  );
}

export default App;
