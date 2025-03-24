import axios from "axios";
import { createContext, useState, useEffect } from "react";
type Event = {
    id?: string;
    title: string;
    start: string;
    end: string;
    description?: string;
}
interface AuthContextType{
    isAuthenticated: boolean;
    login: (token:string)=> void;
    logout: ()=> void;
    events: Event[];
    setNewEvent: (newEvent: object)=> void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [events, setEvents] = useState([]);
    const url_backend=process.env.REACT_APP_URL_BACKEND;

    useEffect(()=>{
        const token = localStorage.getItem('authToken');

        if (token){
            setIsAuthenticated(true);
        }

        axios.get(url_backend+'/events/events')
        .then((result)=>{
            setEvents(result.data);
        })
        .catch(e=>console.log(e))
    },[]);

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    const setNewEvent = (newEvent)=>{
        setEvents((prevEvents) => [...prevEvents, newEvent]);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, events, setNewEvent}}>
            {children}
        </AuthContext.Provider>
    )
}
