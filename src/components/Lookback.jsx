//import React from 'react';
import sample from "./logo.svg";
// Sample data array for dynamic rendering
const lookbackData = [
  {
    id: 1,
    imageSrc: "https://loremflickr.com/200/200?random=1",
    label: "Prize Money",
    value: "Rs 500,000",
  },
  {
    id: 2,
    imageSrc: "https://loremflickr.com/200/200?random=1",
    label: "Prize Money",
    value: "98",
  },
  {
    id: 3,
    imageSrc: "https://loremflickr.com/200/200?random=1",
    label: "Participants",
    value: "24,654",
  },
  {
    id: 4,
    imageSrc: "https://loremflickr.com/200/200?random=1",
    label: "Unique Visitors",
    value: "328,902",
  },
  {
    id: 5,
    imageSrc: "https://loremflickr.com/200/200?random=5",
    label: "Registrations",
    value: "16,302",
  },
];

const Lookback = () => {
  return (
    <div className="py-8 px-4 text-center">
      <h2 className="text-3xl font-semibold mb-4">Lookback</h2>
      <hr className="border-orange-500 w-20 mx-auto mb-8" />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {lookbackData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center bg-orange-500 text-white rounded-lg p-4 shadow-lg mb-10 mr-9"
          >
            <img src={sample} alt={item.label} className="w-16 h-16 mb-6" />
            <p className="text-sm font-medium">{item.label}</p>
            <p className="text-lg font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lookback;
