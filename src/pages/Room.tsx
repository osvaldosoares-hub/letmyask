

//import { KeyObject } from 'crypto';
import { FormEvent,  useState } from 'react';
import { useParams } from 'react-router';
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/button';
import { Question } from '../components/Questions';
import { RoomCode } from '../components/RoonCode';
import { useAuth } from '../hooks/UseAuth';
import { useRoom } from '../hooks/UseRoom';
import { database } from '../services/firebase';
import '../styles/room.scss';







type RoomParams ={
    id: string;
}

export function Room(){
    const {user}= useAuth();
    const params= useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const roomID = params.id;
    const {title,questions}= useRoom(roomID)

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault()
        if(newQuestion.trim()===''){
            return;
        }
        if(!user){
            throw new Error('tou must be logged in');
        }
        const question ={
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted:false,
            isAnswered:false
        };

        await database.ref(`roons/${roomID}/questions`).push(question)

        setNewQuestion('');
    }

    return (
        <div id="page-room">
            <header>
            <div className="content">
                <img src={logoImg} alt="logo" />
                <RoomCode code={roomID}/>
            </div>
            </header>
        
        
        <main className="content">
            <div className="room-title">
                <h1>Sala {title}</h1>
                {questions.length > 0  && <span>{questions.length} perguntas </span> }
            </div>
            <form onSubmit={handleSendQuestion}>
                <textarea 
                placeholder="o que voce quer perguntar"
                onChange={event => setNewQuestion(event.target.value)}
                value={newQuestion}
                />

                <div className="form-footer">
                    {user ? (
                        <div className="user-info">
                            <img src={user.avatar} alt={user.name} />
                            <span>{user.name}</span>
                        </div>
                    ) : (
                        <span>Para enviar uma pergunta <button>faça seu login</button></span>
                    )}
                    
                    <Button type="submit" disabled={!user}>enviar pergunta</Button>
                </div>
            </form>
            <div className="question-list">
            {questions.map(question => {
                return(
                    <Question
                        key={question.id}
                        content={question.content}
                        author={question.author}
                    />
                );
            })}
            </div>
        </main>
        </div>

    );
}