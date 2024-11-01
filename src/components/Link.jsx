export default function Link(props){
    return(
        <a className="h-[1.5rem] w-full flex items-center justify-center font-bold text-[20px] hover:bg-gray-400 hover:text-black" href={props.href}>[ {props.text} ]</a>
    );
}