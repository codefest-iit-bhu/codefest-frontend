//import React from 'react';
import sample from "./logo.svg";
// Sample data array for dynamic rendering
const lookbackData = [
  {
    id: 1,
    imageSrc: "/Award.png",
    label: "Prize Money",
    value: "Rs 500,000",
  },
  {
    id: 2,
    imageSrc: "/Globe.png",
    label: "Prize Money",
    value: "98",
  },
  {
    id: 3,
    imageSrc: "/Users.png",
    label: "Participants",
    value: "24,654",
  },
  {
    id: 4,
    imageSrc: "/TrendingUp.png",
    label: "Unique Visitors",
    value: "328,902",
  },
  {
    id: 5,
    imageSrc: "/Edit.png",
    label: "Registrations",
    value: "16,302",
  },
];

const PixelBox = ({ title, text, img_src }) => {
  return (
    <>
      <div
        className="h-[142px] w-[200px] text-black flex flex-col justify-center items-center"
        style={{
          backgroundImage: "url('/pixelBox.png')",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img src={img_src} alt="" className="w-10 mb-2" />
        <div className="font-bold">{title}</div>
        <div className="text-sm">{text}</div>
      </div>
    </>
  );
};

const Lookback = () => {
  return (
    <div className="text-center bg-[#140B29] mt-[100px] w-screen">
      <img src="lookback.png" alt="" />
      <div className="w-full flex justify-center gap-2">
        {lookbackData.map((data)=><PixelBox title={data.label} text={data.value} img_src={data.imageSrc} key={data.id}/>)}
        
      </div>
    </div>
  );
};

export default Lookback;
