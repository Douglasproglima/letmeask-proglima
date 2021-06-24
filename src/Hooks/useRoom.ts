import { useEffect, useState } from "react";
import { database } from "../services/firebase";

//#region Types
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

export function useRoom(roomId: string) {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState();
  
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
  //#endregion

  return { questions, title }
}