import { useEffect, useState } from "react";

export default function HeadingA(props) {
  const [cursor, setCursor] = useState("|");
  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      setCursor(cursor === "|" ? "\u00A0" : "|");
    }, 1000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [cursor]);
  return (
    <div
      className={`bg-gray-400 p-2 text-black text-${props.size} font-extrabold w-fit flex`}
    >
      {props.text}
      <span className="w-[1rem] block">{cursor}</span>{" "}
    </div>
  );
}
