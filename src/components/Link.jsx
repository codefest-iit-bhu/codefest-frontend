import { Link } from "react-router-dom";

export default function CustomLink(props) {
  return (
    <Link className="bg-[url('/Navbar/NavButton.png')] w-[91px] h-[24px] font-semibold text-center" to={props.href}>{props.text}</Link>
  );
}
