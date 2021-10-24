

import { useHistory } from 'react-router'

import IlustrantionImg from '../assets/images/illustration.svg'
import Logoimg from '../assets/images/logo.svg'
import googleinconimg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { Button } from '../components/button'
import { useAuth } from '../hooks/UseAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'


export function Home(){
    const history = useHistory();
   const {user,signINWithGoogle}= useAuth();
   
    const [roomCode, setRoomCode] = useState('');
   async function handleCreatRoom(){
        if(!user){
            await signINWithGoogle()
        }
            history.push('/roons/new');
       
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();
        if(roomCode.trim() ===''){
            return;
        }

        const roomRef = await database.ref(`roons/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('room does not exist')
            return;
        }
        history.push(`/roons/${roomCode}`);

    }

    return (
        <div id="page-auth">
            <aside>
                <img src={IlustrantionImg} alt="ilustração " />
                <strong> Crie salas de Q&amp;A ao-vivo </strong>z
                <p>Tire as duvidas da sua audiencia em tempo-real</p>
            </aside>
            <main>
                
                <div className="main-content">
                    <img src={Logoimg} alt="logo" />
                    <button onClick={handleCreatRoom} className="create-room">
                        <img src={googleinconimg} alt="icon google" />
                        crie sua sala com o google
                    </button>
                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                        type="text" 
                        placeholder="digite o codigo da sala"
                        onChange={event => setRoomCode(event.target.value)}
                        value={roomCode}
                        />
                        <Button type="submit">Entrar na sala
                            
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}