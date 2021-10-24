import {  useContext } from "react";
import { AuthContext } from "../contexts/AutoContexts";

export function useAuth(){
    const value = useContext(AuthContext)
    
    return value;
}