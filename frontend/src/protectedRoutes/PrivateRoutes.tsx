import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from '../store/types';
import { useEffect } from "react";


const PrivateRoute = ({children}) =>{
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.isAuthenticated);
    
    useEffect(() => {
        if(!isAuthenticated){
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    return <>{children}</>

}

export default PrivateRoute;