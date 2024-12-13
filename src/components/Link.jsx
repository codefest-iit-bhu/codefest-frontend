import { Link } from "react-router-dom";

export default function CustomLink(props) {
  return (
    <Link className="h-full w-full flex items-center justify-center font-bold font-mono text-[20px] hover:bg-gray-400 hover:text-black" to={props.href}>[ {props.text} ]</Link>
  );
}
