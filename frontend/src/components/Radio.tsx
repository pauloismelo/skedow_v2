interface RadioProps{
    
    title: string;
    name: string;
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

function Radio({title, name, value, onchange}:RadioProps) {
    return ( 
        <>
            <input type="radio" name={name} value={value ? value : ''} className="border-gray-200 border-2 " onChange={onchange}/> {title}
        </>
     );
}

export default Radio;