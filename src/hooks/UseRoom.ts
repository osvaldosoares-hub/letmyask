import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type FirebaseQuestions = Record<string, {
    author : {
        name:string;
        avatar:string;
    }
    content : string;
    isAnswered:boolean;
    isHighlighted:boolean;
}>

type QuestionsType={
    id:string;
    author : {
        name:string;
        avatar:string;
    }
    content : string;
    isAnswered:boolean;
    isHighlighted:boolean;
}


export function useRoom(roomID: string){
    const [questions, setQuestions] = useState<QuestionsType[]>([]);
    const [title, setTitle] = useState('');

    useEffect(()=>{
       
        const roomRef = database.ref(`roons/${roomID}`)

        roomRef.on('value', room=>{
            const databaseRoom = room.val()
           
            const firebaseQuestions :FirebaseQuestions = databaseRoom.questions ?? {};
           
           
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
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
    }, [roomID]);

    return {questions, title}
}