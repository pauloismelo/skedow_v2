import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'


import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ViewEvent from '../components/modals/ViewEvent';
import CreateEvent from '../components/modals/CreateEvent';
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';


function Dashboard() {
    const {logout, events, setNewEvent} = useContext(AuthContext);
    const filteredEvents = events.filter(event => new Date(event.start) > new Date);
    const sortedEvents = filteredEvents.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

    const [showModalView, setshowModalView] = useState(false);
    const [showModalCreate, setshowModalCreate] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const url_backend=process.env.REACT_APP_URL_BACKEND;
    
    const handleEventClick = (clickInfo: any) => {
        setSelectedEvent(clickInfo.event);
        setshowModalView(true);
    };

    const NewEvent = (clickInfo: any) => {
        setshowModalCreate(true);
    };

    const handleCloseModalView = () => {
        setshowModalView(false);
        setSelectedEvent(null);
    };

    const handleCloseModalCreate = () => {
        setshowModalCreate(false);
    };

    const handleSubmitCreateEvent = (datasNewEvent) =>{
        
        console.log(datasNewEvent);
        axios.post(url_backend+`/events/new`, datasNewEvent)
        .then((result)=>{
            
            if (result.data.type=='success'){
                toast.success(result.data.msg,{
                    theme: process.env.TOAST_THEME,
                    autoClose: 2500,
                    onClose: handleCloseModalCreate,
                })
                
                setNewEvent(result.data.event);
            }
        })
        .catch(error=>{
            toast.error('Error in insert event. Try again!',{
                theme: process.env.TOAST_THEME,
                autoClose: 2500,
            })
        })
    }

    const handleLogout = () =>{
        logout();
    }
   
    // a custom render function
    function renderEventContent(eventInfo) {
        let hour = new Date(eventInfo.event.start).getHours();
        let title = hour!=0 && `${new Date(eventInfo.event.start).getHours()}:${new Date(eventInfo.event.start).getMinutes()}`;

        let eventColor = 'green';
        let fontColor = 'white';  // Cor padrão
        switch (eventInfo.event.extendedProps.priority) {
            case 'high':
                eventColor = 'red';
                break;
            case 'medium':
                eventColor = 'yellow';
                fontColor = 'black';
                break;
            case 'low':
                eventColor = 'green';
                break;
        }
        
        return (
        <div style={{ backgroundColor: eventColor, color: fontColor, overflow: "hidden" }}> 
            {title && (<b>{title} <br /></b>) }
           
            <small>{eventInfo.event.title}</small>
        </div>
        )
    }
    return ( 
        <>
        <ToastContainer/>
            <div className="h-screen w-screen flex flex-col">
                <div className="h-1/6 bg-gray-900 text-white p-2 flex-1 flex items-center space-y-4">
                    <div className='w-2/4'>
                        <h1 className="font-bold text-2xl">Skedow</h1>
                        <h6>Manage Appointments</h6>
                    </div>
                    <div className='w-2/4 p-2 text-right text-white'>
                        <Link to='/dashboard' className='mr-2 text-white'>Home</Link>
                        <Link to='/login' onClick={handleLogout} className='text-white hover:text-red-800'>Logout</Link>
                    </div>
                    
                </div>

                <div className="h-full flex-1 flex">
                    <div className="w-2/4 p-2 min-h-full overflow-hidden">
                        <FullCalendar plugins={[dayGridPlugin, timeGridPlugin]} initialView='dayGridMonth' 
                        weekends={true}
                        events={events}
                        eventContent={renderEventContent}
                        eventClick={handleEventClick}
                        locale='pt'
                        eventMouseEnter={(info) => {
                            if (info.el instanceof HTMLElement) {  // Verifica se é um elemento HTML
                              info.el.style.cursor = 'pointer';  // Define o cursor como pointer quando o mouse passa por cima
                            }
                          }}
                        
                        />

                        {/* Modal */}
                        <ViewEvent showModal={showModalView} handleCloseModal={handleCloseModalView} selectedEvent={selectedEvent} />
                        
                    </div>
                    <div className="w-2/4 relative top-0 p-2">
                        <div className="items-center flex-1 flex space-y-4 border-2 border-gray-200">
                            <div className="w-2/4 p-2 text-lg font-bold">
                                Upcoming events
                            </div>
                            <div className="w-2/4 p-2 text-right">
                                <div title='Create New Event' className='flex bg-blue-800 hover:bg-gray-600 cursor-pointer text-white items-center justify-center text-right rounded-3xl w-6 h-6 p-6' onClick={NewEvent}>
                                    <FontAwesomeIcon icon={faEdit} className='items-center' />
                                </div>
                            </div>
                            <CreateEvent showModal={showModalCreate} handleCloseModal={handleCloseModalCreate} handleSubmit={handleSubmitCreateEvent} />
                        </div>

                        <div className="flex-1 flex flex-col space-y-4 pl-4">
                            {sortedEvents &&
                             sortedEvents.map((item, index)=>(
                                
                                <div key={index} className='flexspace-x-4 border-b-2 border-gray-400 border-dashed'>
                                    
                                    <div className="flex-1 font-extrabold">{item.title}</div>
                                    <div className="flex-1 text-xs">
                                        From: 
                                        {new Date(item.start).getDate()}/
                                        {new Date(item.start).getMonth() + 1}/
                                        {new Date(item.start).getFullYear()} às {new Date(item.start).getHours()}:{new Date(item.start).getMinutes()}
                                    </div>
                                    <div className="flex-1 text-xs">
                                        To: 
                                        {new Date(item.end).getDate()}/
                                        {new Date(item.end).getMonth() + 1}/
                                        {new Date(item.end).getFullYear()} às {new Date(item.end).getHours()}:{new Date(item.end).getMinutes()}
                                    </div>
                                    
                                </div>
                             ))

                            }
                        </div>
                        
                    </div>
                </div>
                <div className="h-6 bg-gray-900 text-center text-white">
                    Developed by Paulo Melo
                </div>
            </div>
        </>
     );
}

export default Dashboard;

