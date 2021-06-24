import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../Hooks/useAuth';
import { useRoom } from '../../Hooks/useRoom';
import { database } from '../../services/firebase';
import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';

import logoImg from '../../assets/images/logo.svg';
import './styles.scss';

//#region Types
type RoomParams = {
  id: string
};
//#endregion

export function AdminRoom() {
  //#region States and Variables
  
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState('');
  
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  //#endregion

  //#region Methods
  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') return;

    if (!user)
      throw new Error('You must be logged in');

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  }
  //#endregion

  return (
    <>
      <div id='page-room'>
        <header>
          <div className='content'>
            <img src={logoImg} alt='Letmeask' />
            <div>
              <RoomCode code={roomId} />
              <Button isOutlined >Encerrar Sala</Button>
            </div>
          </div>
        </header>

        <main className='content'>
          <div className='room-title'>
            <h1>Sala {title}</h1>
            {questions.length > 0 && (
              <span>{questions.length} pergunta(s)</span>
            )}
          </div>

          <div className="question-list">
            {
              /*Recuperar valores da API do firebase*/
              /* https://firebase.google.com/docs/database/admin/retrieve-data?hl=pt-br#section-event-types */
              /* Map -> Similar ao foreache porém retorna um elemento percorrido */
              questions.map(question => {
                return (
                  <Question
                    key={question.id}
                    author={question.author} 
                    content={question.content} 
                  />
                );
              })
            }
          </div>
        </main>
      </div>
    </>
  );
}
