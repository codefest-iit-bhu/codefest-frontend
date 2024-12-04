import { Link } from "react-router-dom";

export default function CustomLink(props){
    return(
        <Link className="h-[1.5rem] w-full flex items-center justify-center font-bold text-[20px] hover:bg-gray-400 hover:text-black" to={props.href}>[ {props.text} ]</Link>
    );
}