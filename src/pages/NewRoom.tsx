import { useContext } from 'react'
import { Link } from 'react-router-dom';
import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import '../styles/auth.scss';

import { TesteContext } from '../App';

export function NewRoom() {

  const { value, setValue} = useContext(TesteContext);

  return (
    <div id="page-auth">
      <aside>
        <img src={ilustrationImg} alt="Ilustração perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <h1>{ value + ' 2' }</h1>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask-proglima" />
          <h2>Criar uma nova sala</h2>
          <form action="">
            <input type="text" placeholder="Nome da sala" />
            <Button type="submit">Criar Sala</Button>
          </form>
          <p>Quer entrar em uma sala já existente?
            <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>

    </div>
  );
}