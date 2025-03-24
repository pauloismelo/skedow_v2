interface ButtonProps{
    title: string;
    type: string;
}

function Button({title, type}: ButtonProps) {

    const colorButton = type==='success' ? 'bg-green-900' : 'bg-red-900'
    return ( 
    <div className="mt-4">
        <button className={`${colorButton} text-white px-6 py-2`}>{title}</button>
    </div>
    );
}

export default Button;