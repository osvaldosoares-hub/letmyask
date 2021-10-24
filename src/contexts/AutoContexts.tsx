import { createContext, useState, useEffect , ReactNode} from 'react';
import {firebase,auth} from '../services/firebase'
type User = {
    id:string;
    name: string;
    avatar: string;
  }
  
  type AuthContextType= {
    user: User | undefined;
    signINWithGoogle:()=>Promise<void>;
  }
type AuthContextProviderProps ={
    children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextType);

export function AuthcontextProvider(props:AuthContextProviderProps){
    const [user,setUser] = useState<User>()
  useEffect(()=>{ 
   const unsubscribe= auth.onAuthStateChanged(user =>{
      if(user){
        const {displayName, photoURL,uid}= user
              if(!displayName || !photoURL){
                throw new Error ("missing infomation from google account");

              }
              setUser({
                id: uid,
                name:displayName,
                avatar:photoURL
              })
      }
    })
    return ()=>{
      unsubscribe();
    }
  },[])
async function signINWithGoogle()
  {
       const provider = new firebase.auth.GoogleAuthProvider();
        
       const result = await auth.signInWithPopup(provider);
        
            console.log(result)
            if(result.user){
              const {displayName, photoURL,uid}= result.user
              if(!displayName || !photoURL){
                throw new Error ("missing infomation from google account");

              }
              setUser({
                id: uid,
                name:displayName,
                avatar:photoURL
              })
            }
           
  }
    return (
        <AuthContext.Provider value={{user,signINWithGoogle}}>
            {props.children}
        </AuthContext.Provider>
    );
}