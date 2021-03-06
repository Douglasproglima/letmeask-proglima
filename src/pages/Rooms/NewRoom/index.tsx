import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { database } from '../../../services/firebase';
import { useAuth } from '../../../Hooks/useAuth';

import illustrationImg from '../../../assets/images/illustration.svg';
import logoImg from '../../../assets/images/logo.svg';
import '../../../styles/auth.scss';

export function NewRoom() {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();

  async function handleCreateNewRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') return;

    //Referencia a categoria ou separação denominadas rooms no DB.
    const roomRef = database.ref('rooms');

    //Add uma nova sala no DB do firebase
    //Doc Ler/Escrever dados: 
    //https://firebase.google.com/docs/database/web/read-and-write?hl=pt-br
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <>
      <div id="page-auth">
        <aside>
          <img src={ illustrationImg } alt="Ilustração perguntas e respostas" />
          <strong>Crie salas de Q&amp;A ao vivo</strong>
          <p>Tire as dúvidas da sua audiência em tempo-real</p>
        </aside>

        <main>
          <div className="main-content">
            <Link to="/">
              <img src={logoImg} alt="Letmeask-proglima" />
            </Link>
            <h2>Criar uma nova sala</h2>
            <form onSubmit={handleCreateNewRoom}>
              <input
                onChange={ event => setNewRoom(event.target.value) }
                value={ newRoom }
                type="text"
                placeholder="Nome da sala"
              />
              <Button type="submit">Criar Sala</Button>
            </form>
            <p>Quer entrar em uma sala já existente?
              <Link to="/">Clique aqui</Link>
            </p>
          </div>
        </main>

      </div>
    </>
  );
}