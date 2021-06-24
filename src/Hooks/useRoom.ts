import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

//#region Types
type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  },
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  hasLiked: boolean;
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}>
//#endregion

export function useRoom(roomId: string) {
  const { user } = useAuth();
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
          likeCount: Object.values(value.likes ?? {}).length,
          /* Some => Percorre o array até encontrar uma condição que satifaz (true, false) */
          hasLiked: Object.values(value.likes ?? {}).some(like => like.authorId === user?.id)
        }
      })

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    })

    /* Remover todos os eventListerners para a referencia de sala do roomRef.on('value', ...*/
    return () => {
      roomRef.off('value');
    }

  }, [roomId, user?.id]);
  //#endregion

  return { questions, title }
}