export default function TextBox(props){
    return(
        <>
            <input type="text" className="my-6 h-10 border-gray-400 border-2 bg-transparent text-gray-400 font-bold text-lg placeholder:text-center" placeholder={props.placeholder}/>
        </>
    );
}