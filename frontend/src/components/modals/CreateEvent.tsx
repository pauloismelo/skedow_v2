import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-toastify";

import App from './AutoCompleteMap';
import Radio from "../Radio";



function CreateEvent({showModal, handleCloseModal, handleSubmit}) {
    const [dataNewEvent, setDataNewEvent] = useState({})
    const [guests, setGuests] = useState([]);
    const [email, setEmail] = useState('');

    // Date 
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const currentDate = `${year}-${month}-${day}`;
    const currentTime = date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    useEffect(()=>{
        setDataNewEvent({...dataNewEvent, 'datestart': currentDate})
        setDataNewEvent({...dataNewEvent, 'timestart': currentTime})
    },[])
    
    // Date 
    const insertGuest = (e) =>{
        if (email){
            const updatedGuests = [...guests, email];
            setGuests(updatedGuests)
            setDataNewEvent({...dataNewEvent, guests: updatedGuests});
            setEmail('');
        }else{
            toast.error('Fill the guest input!',{
                theme: process.env.TOAST_THEME,
                autoClose: 2500,
            });
        }
    }

    const removeGuest = (index) =>{
        const updatedGuests = guests.filter((element, i) => i !== index);
        setGuests(updatedGuests)
    }

    const handlechange = (e) => {
        setDataNewEvent({...dataNewEvent, [e.target.name]: e.target.value});
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault();

        handleSubmit(dataNewEvent)
    }

    return ( 
        <Modal show={showModal} onHide={handleCloseModal}>
            <form onSubmit={handleOnSubmit}>
            <Modal.Header closeButton>
            <Modal.Title>Create New Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container text-xs">
                    <div className="row">
                        <div className="col-6">
                            <label>Priority</label>
                            <select name="priority" className="form-select" required onChange={handlechange}>
                                <option value=''>Select one option...</option>
                                <option value='high' className="bg-red-600 text-white">High</option>
                                <option value='medium' className="bg-yellow-600 text-white">Medium</option>
                                <option value='low' className="bg-green-600 text-white">Low</option>

                            </select>
                        </div>
                        <div className="col-6 align-middle">
                            <label>Event type</label>
                            <ul>
                                <li>
                                    <Radio name="type" value="tarefa" onchange={handlechange} title="Tarefa" />
                                </li>
                                <li>
                                    <Radio name="type" value="evento" onchange={handlechange} title="Evento" />
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                    <div className="row">
                        <label>Title</label>
                        <input type="text" name="title" className="form-control" onChange={handlechange} required/>
                    </div>
                    <div className="row">
                        <App onchange={handlechange}/>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>Date Start</label>
                            <input type="date" name="datestart" className="form-control col-6" onChange={handlechange} required/>
                            
                        </div>
                        <div className="col-6">
                            <label>Time Start</label>
                            <input type="time" name="timestart" className="form-control col-6" placeholder={currentTime} onChange={handlechange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>Date End</label>
                            <input type="date" name="dateend" className="form-control col-6" onChange={handlechange} min={currentDate} required/>
                            
                        </div>
                        <div className="col-6">
                            <label>Time End</label>
                            <input type="time" name="timeend" className="form-control col-6"  onChange={handlechange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label>Guests</label>
                            {guests.length>0 &&
                            guests.map((item, index)=>(
                            <div className="row" key={index}>
                                <div className="col-10">{item}</div>
                                <div className="col-2"><FontAwesomeIcon className="cursor-pointer hover:text-red-600" icon={faTrash} title="Remove this Guest" onClick={()=>removeGuest(index)}></FontAwesomeIcon></div>
                            </div>
                            ))}
                            <div className="row">
                                <div className="col-10">
                                    <input type="hidden" name="guests"  onChange={handlechange} value={guests}/>
                                    
                                    <input type="email" name="email" className="form-control col-6" onChange={handleEmail} value={email}/>
                                </div>
                                <div className="col-2 p-2">
                                    <FontAwesomeIcon icon={faCirclePlus} className="text-blue-800 hover:text-gray-600 cursor-pointer" onClick={insertGuest}/>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                    <div className="row">
                        <label>Description</label>
                        <textarea name="description" className="form-control" onChange={handlechange} required></textarea>
                        
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit">
                    Create
                </Button>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Fechar
                </Button>
            </Modal.Footer>
            </form>
        </Modal>
     );
}

export default CreateEvent;