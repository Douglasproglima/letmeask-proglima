import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { database } from '../services/firebase';
import { Button } from '../components/Button';
import { useAuth } from '../Hooks/useAuth';

import illustrationImg from '../assets/images/illustration.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss';

export function Home() {
  const history = useHistory();
  const { signInWithGoogle, user } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) await signInWithGoogle();

    history.push('/rooms/new');
  }
    
  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if (!(roomRef).exists()) {
      alert('Room does not exists.');
      return;
    }

    if((roomRef).val().endedAt) {
      alert('Room already closed.')
      return
    }

    history.push(`rooms/${roomCode}`);
  }

  return (
    <div className="container">
      <div id="page-auth">
        <aside>
          <img src={illustrationImg} alt="Ilustração perguntas e respostas" />
          <strong>Crie salas de Q&amp;A ao vivo</strong>
          <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
        </aside>

        <main>
          <div className="main-content">
            <img src={logoImg} alt="Letmeask-proglima" />
            <button onClick={handleCreateRoom} className="create-room" >
              <img src={googleIconImg} alt="Logo do Google" />
              Crie sua sala com o Google
            </button>
            <div className="separator">Ou entre em uma sala</div>
            <form onSubmit={ handleJoinRoom }>
              <input
                onChange={ event => setRoomCode(event.target.value) }
                value={ roomCode }
                type="text"
                placeholder="Digite o código da sala"
              />
              <Button type="submit">Entrar na Sala</Button>
            </form>
          </div>
        </main>

      </div>
    </div>
  );
}