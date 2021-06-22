
import { useHistory } from 'react-router-dom';
import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import { Button } from '../components/Button';
import '../styles/auth.scss';

export function Home() {
  const history = useHistory();

  const navigateToNewRoom = () => history.push('/rooms/new');

  return (
    <div id="page-auth">
      <aside>
        <img src={ilustrationImg} alt="Ilustração perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask-proglima" />
          <button onClick={navigateToNewRoom} className="create-room" >
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">Ou entre em uma sala</div>
          <form action="">
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na Sala</Button>
          </form>
        </div>
      </main>

    </div>
  );
}