import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Textarea from "../Textarea";
import NewInteraction from "../forms/NewInteraction";

function ViewEvent({showModal, handleCloseModal, selectedEvent}) {

    const [showNewInteracao, setShowNewInteracao] = useState(false);

    const handleInteracao = () => {
        setShowNewInteracao(!showNewInteracao);
    }

    const submitInteraction = () => {

        //aqui eu tenho que fazer a chamada para o backend enviado a interacao e depois atualizando a lista de interacoes
    }

    const guestsSelected = selectedEvent?.extendedProps?.guests || "Sem convidados"

    return ( 
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header className="bg-gray-900 text-white" closeButton>
                <Modal.Title>{selectedEvent?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="row">
                <div className="col-6">
                    <strong>Data:</strong> {selectedEvent?.start?.toLocaleDateString()}<br/>
                </div>
                <div className="col-6">
                <strong>Local:</strong> {selectedEvent?.extendedProps?.local || "Sem local"}<br/>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <strong>Convidados: </strong> 
                    {guestsSelected}
                    <br/>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <strong>Descrição:</strong> {selectedEvent?.extendedProps?.description || "Sem descrição"}<br/>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Button variant="primary btn-sm" onClick={handleInteracao} >
                        Nova Interação
                    </Button>
                </div>
            </div>

            {showNewInteracao && (
                <NewInteraction submit={submitInteraction} /> 
            )}
            
            
            
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
                Fechar
            </Button>
            </Modal.Footer>
        </Modal>
     );
}

export default ViewEvent;