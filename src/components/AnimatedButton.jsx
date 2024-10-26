import "./AnimatedButton.css";
export default function AnimatedButton(props ) {
  return (
    <button className="animated-button my-4" onClick={props.onClick}>
      {props.text}
      <span className="fill"></span>
    </button>
  );
}
