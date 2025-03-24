
interface TextareaProps{
    title: string;
    name: string;
    onchange: (e) => void;
    value?: string;
}

function Textarea({title, name, value, onchange}: TextareaProps) {
    return ( 
        <div className="mt-4">
            <label>{title}</label>
            
            <textarea name={name} className="border-gray-200 border-2 h-10 ml-2 w-full" onChange={onchange}>
             {value ? value : ''}
            </textarea>
        </div>
     );
}

export default Textarea;