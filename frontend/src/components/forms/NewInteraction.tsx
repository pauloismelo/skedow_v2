import { useState } from "react";
import Textarea from "../Textarea";
import Button from "../Button";

interface interactionProps{
    submit: ()=> void;
}

function NewInteraction({submit}: interactionProps) {

    const [newInteracao, setNewInteracao] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        submit()
    }


    return ( 
        <div className="row">
            <form onSubmit={handleSubmit}>
                <div className="col-10">
                    <Textarea title="Nova Interação" name="newinteracao" onchange={(e) => setNewInteracao(e.target.value)} value={newInteracao}/>
                </div>
                <div className="col-2">
                    <Button title="Salvar" type="success"/>
                </div>
            </form>
        </div>
     );
}

export default NewInteraction;