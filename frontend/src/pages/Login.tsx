import { useContext, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


function Login() {
    const navigate = useNavigate();
    const {login} = useContext(AuthContext)
    const url_backend=process.env.REACT_APP_URL_BACKEND;
    const [data, setData] = useState<Record<string,string>>({});

    const HandleChange = (e) =>{
        setData({...data, [e.target.name]: e.target.value})
    }

    const HandleSubmit = (e) =>{
        
        e.preventDefault();
        axios.post(url_backend+`/login`, data )
        .then((result)=>{
            login(result.data.token);
            toast.success(result.data.msg,{
                theme: process.env.TOAST_THEME,
                autoClose: 2500,
                //chamar login do contexto
                
                onClose: () => navigate('/dashboard'),
            })
        })
        .catch(e=>{
            toast.error('Try again!',{
                theme: process.env.TOAST_THEME,
                autoClose: 2500,
            })
            console.log(e)
        })


    }   


    return ( 
        <>
        <ToastContainer/>
        <div className="h-screen w-screen flex flex-col">
            <div className="h-1/5 bg-gray-900 text-white p-8">
                <h1 className="font-bold">Skedow</h1>
                <h6>Manage Appointments</h6>
            </div>

            <div className="flex-1 flex justify-center items-center">
                <div className="w-full max-w-md p-8 border-2 border-gray-200 rounded-lg text-center">
                    <form onSubmit={HandleSubmit}>
                        <h2 className="font-bold text-3xl">Login</h2>
                        <Input title="Login" type="text" name="login" onchange={HandleChange} value={data.login}/>
                        <Input title="Password" type="password" name="password" onchange={HandleChange} value={data.password}/>
                        
                        <Button type='success' title='Login'/>
                    </form>
                </div>
            </div>

            <div className="h-1/5 bg-gray-900 text-center text-white p-4">
                Developed by Paulo Melo
            </div>
        </div>
        </>
        
    );
}

export default Login;
