import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../../Hooks/useAuth';
import { database } from '../../../services/firebase';
import { Button } from '../../../components/Button';
import { RoomCode } from '../../../components/RoomCode';
import { Question } from '../../../components/Question';

import logoImg from '../../../assets/images/logo.svg';
import './styles.scss';
//import '../styles/room.scss';

//#region Types
type RoomParams = {
  id: string
};

type QuestionType = {
  id: string,
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean
};

type FirebaseQuestions = Record<string, {
    author: {
      name: string,
      avatar: string
    },
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean
  }>
//#endregion

export function Room() {
  //#region States and Variables
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState();
  //#endregion

  //#region Methods
  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    /* Observa o evento da lista
    function onChildAdded() {}
    function onChildChanged() {}

    roomRef.on('child_added', onChildAdded);
    roomRef.on('child_changed', onChildChanged);
    */

    roomRef.on('value', (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map( ([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
        }
      })

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    })
  }, [roomId]);

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
            <RoomCode code={roomId} />
          </div>
        </header>

        <main className='content'>
          <div className='room-title'>
            <h1>Sala {title}</h1>
            {questions.length > 0 && (
              <span>{questions.length} pergunta(s)</span>
            )}
          </div>

          <form onSubmit={handleSendQuestion}>
            <textarea
              placeholder='O que você quer perguntas?'
              onChange={(event) => setNewQuestion(event.target.value)}
              value={newQuestion}
            />

            <div className='form-footer'>
              {user ? (
                <div className='user-info'>
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
                </div>
              ) : (
                <span>
                  Para enviar uma pergunta, <button>faça seu login</button>.
                </span>
              )}

              <Button type='submit' disabled={!user}>
                Enviar Pergunta
              </Button>
            </div>
          </form>

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
