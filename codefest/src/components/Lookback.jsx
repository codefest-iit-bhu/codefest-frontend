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
    label: "Colleges",
    value: "98",
  },
  {
    id: 3,
    imageSrc: "/Users.png",
    label: "Participants",
    value: "35,654",
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
    value: "22,302",
  },
];

const PixelBox = ({ title, text, img_src }) => {
  return (
    <>
      <div
        className="h-[95px] w-[133px] md:h-[142px] md:w-[200px] text-black flex flex-col flex-shrink-0 justify-center items-center hover:scale-105 rounded-lg transition-all duration-300"
        style={{
          backgroundImage: "url('/pixelBox.png')",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img src={img_src} alt="" className="w-5 md:w-10 mb-2" />
        <div className="font-bold">{title}</div>
        <div className="text-sm font-mono">{text}</div>
      </div>
    </>
  );
};

const Lookback = () => {
  return (
    <div className="bg-[#140B29] mt-32 md:mt-28 lg:mt-8 w-screen mb-10">
      <div className="text-5xl md:text-7xl p-10 z-[1]">LOOKBACK</div>
      <div className="w-full flex justify-center gap-2 flex-wrap p-2">
        {lookbackData.map((data) => <PixelBox title={data.label} text={data.value} img_src={data.imageSrc} key={data.id} />)}

      </div>
    </div>
  );
};

export default Lookback;
