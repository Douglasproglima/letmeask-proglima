import { Fragment } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import { useRoom } from '../../Hooks/useRoom';
import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';
import { database } from '../../services/firebase';

import logoImg from '../../assets/images/logo.svg';
import answerImg from '../../assets/images/answer.svg';
import checkImg from '../../assets/images/check.svg';
import deleteImg from '../../assets/images/delete.svg';
import './styles.scss';

//#region Types
type RoomParams = {
  id: string
};
//#endregion

export function AdminRoom() {
  //#region States and Variables
  //const { user } = useAuth();  
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  //#endregion

  //#region Methods
  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }

  async function handleCheckQuestionAsAnswer(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async  function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }
  //#endregion

  return (
    <>
      <div id='page-room'>
        <header>
          <div className='content'>
            <Link to="/">
              <img src={logoImg} alt='Letmeask' />
            </Link>
            <div>
              <RoomCode code={roomId} />
              <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
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
                    isAnswered={ question.isAnswered}
                    isHighlighted={ question.isHighlighted}
                  >
                    { 
                      !question.isAnswered && (
                        <Fragment>
                          <button
                            type="button"
                            onClick={() => handleCheckQuestionAsAnswer(question.id)}
                          >
                            <img src={checkImg} alt="Marcar pergunta como respondida" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleHighlightQuestion(question.id)}
                          >
                            <img src={answerImg} alt="Dar destaque à pergunta" />
                          </button>
                        </Fragment>                      
                      )
                    }

                    <button
                      type="button"
                      onClick={() => handleDeleteQuestion(question.id)}
                    >
                      <img src={deleteImg} alt="Remover pergunta" />
                    </button>
                  </Question>
                );
              })
            }
          </div>
        </main>
      </div>
    </>
  );
}
