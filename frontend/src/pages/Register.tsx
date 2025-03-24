import { useState } from 'react';
import axios from 'axios'
import Button from '../components/Button';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


function Register() {
    const navigate = useNavigate();
    const url_backend=process.env.REACT_APP_URL_BACKEND;
    const [data, setData] = useState<Record<string,string>>({});

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{  
        setData({...data, [e.target.name]: e.target.value});
    }

    const HandleSubmit = (e) =>{

        e.preventDefault();
        axios.post(url_backend+`/register`, data )
        .then((result)=>{
            toast.success(result.data.msg,{
                theme: process.env.TOAST_THEME,
                autoClose: 2500,
                onClose: () => navigate('/login'),
            })
        })
        .catch(e=>{
            toast.error(e.data.msg+'Try again!',{
                theme: process.env.TOAST_THEME,
                autoClose: 2500,
            })
            console.log(e)
        })
        
    }   


    return ( 
        <>
            <ToastContainer/>
            <div className="h-full w-full min-h-full min-w-full">
                <div className="h-1/5 bg-gray-900 text-white p-8">
                    <h1 className="font-bold">Skedow</h1>
                    <h6>Manage Appointments</h6>
                </div>
                <div className="h-3/5">
                    <div className="m-48 rounded border-gray-200 border-solid border-2 p-8 text-center">
                        <form onSubmit={HandleSubmit}>
                            <h2 className="font-bold text-3xl">Register</h2>
                            <Input title="Login" type="text" name="login" onchange={HandleChange} value={data.login || ''}/>
                            <Input title="Password" type="password" name="password" onchange={HandleChange}  value={data.password || ''}/>
                            
                            <Button type='success' title='Register'/>
                        </form>
                    </div>
                </div>

                <div className="h-1/5 bg-gray-900 text-center text-white">
                    Developed by Paulo Melo
                </div>
            </div>
        </>
        
        
    );
}

export default Register;
