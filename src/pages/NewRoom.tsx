
import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import IlustrantionImg from '../assets/images/illustration.svg'
import Logoimg from '../assets/images/logo.svg'
import '../styles/auth.scss'
import { Button } from '../components/button'
import { useAuth } from '../hooks/UseAuth'
import { database } from '../services/firebase'
//import { userInfo } from 'os'

export function NewRoom(){
    const {user}= useAuth();
    const history= useHistory();
    const [newRoom ,setNewRoom] = useState('');
        async function handleCreatRoom(event: FormEvent){
                event.preventDefault();
                if(newRoom.trim()===''){
                    return ;
                }


            const roomRef = database.ref('roons');

            const firebaseRoom = await roomRef.push({
                title:newRoom,
                authorId: user?.id,

            });
            history.push(`/roons/${firebaseRoom.key}`)
        }

    return (
        <div id="page-auth">
            <aside>
                <img src={IlustrantionImg} alt="ilustração " />
                <strong> Crie salas de Q&amp;A ao-vivo </strong>
                <p>Tire as duvidas da sua audiencia em tempo-real</p>
            </aside>
            <main>
                
                <div className="main-content">
                    <img src={Logoimg} alt="logo" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreatRoom}>
                        <input 
                        type="text" 
                        placeholder="Nome da sala"
                        onChange={event => setNewRoom(event.target.value)}
                        value={newRoom}
                        />
                        <Button type="submit">Criar sala
                            
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente ? <Link to="/">Clique aqui</Link> 
                    </p>
                </div>
            </main>
        </div>
    )
}