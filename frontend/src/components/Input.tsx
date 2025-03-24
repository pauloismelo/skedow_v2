
interface InputProps{
    
    title: string;
    type: string;
    name: string;
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    placeholder?: string;
}

function Input({title, type, name, value, onchange}: InputProps) {
    return ( 
        <div className="mt-4">
            <label>{title}</label>
            <input type={type} name={name} value={value ? value : ''} className="border-gray-200 border-2 h-10 ml-2" onChange={onchange}/>
        </div>
     );
}

export default Input;