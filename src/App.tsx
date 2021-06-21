import { Button } from './components/Button';
import { Input } from './components/Input';
import { CounterButton } from './components/CounterButton';

function App() {
  return (
    <>
      <h1>Hello World</h1>
      <div />
      <Input visible={ true } placeHolder="Seu nome aqui" />
      <div />
      <Input visible={true} placeHolder="Sua idade" width={ 80 } />
      <div />
      <Button visible={ true } text="Novo" textInput="ID" />
      <Button>Cancelar</Button>
      <div />
      <CounterButton />
    </>
  );
}

export default App;
