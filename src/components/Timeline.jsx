import { Link } from "react-router-dom";
import timelineElements from "./../assets/timelineElements";
// import schoolIcon from "./assets/school.svg";
// import workIcon from "./assets/work.svg";

export default function Timeline({ events }) {
  return (
    <>
      {/* <div className="flex flex-col items-center mt-8">
        {events.sort((a, b) => {
          const dateA = new Date(a.date)
          const dateB = new Date(b.date)
          return dateA - dateB;
        }).map((event) => {
          const color = "bg-gray-500";

          return (
            <div key={event.name} className="flex m-4 relative">
              <div className="border border-gray-600 rounded-lg px-8 py-4 bg-gray-800 w-full text-center z-10 sm:w-96">
                <div className="text-2xl font-medium">{event.title}</div>
                <div className="text-gray-300 mb-6 sm:mb-8 sm:text-xs">
                  <span>{event.date}</span>
                </div>
                <div className="text-gray-400 font-medium pb-6">Registration deadline: {event.last_date_reg}</div>
                {
                  ((new Date()) < (new Date(event.last_date_reg))) && <Link
                    className={`${color} text-gray-950 font-medium px-4 py-1 rounded-md mx-auto cursor-pointer hover:text-white`} to={`/event/${event.name}`}
                  >
                    Open
                  </Link>
                }
              </div>
            </div>
          );
        })}
      </div> */}

      <div className="flex flex-col items-center mt-8">
        <ol class="relative border-l-2 border-green-400 dark:border-green-700">

          {events.sort((a, b) => {
            const dateA = new Date(a.date)
            const dateB = new Date(b.date)
            return dateA - dateB;
          }).map((event) => {
            const color = "bg-gray-500";

            return (
              <li key={event.name} className="mb-10 ms-4">
                <div class="absolute w-3 h-3 bg-green-400 rounded-full mt-1.5 -start-1.5 border border-white dark:border-green-400 dark:bg-grren-400"></div>
                <div className="w-4/5 text-green-400"> {event.date} </div>
                <div className="border border-gray-600 rounded-lg px-8 py-4 bg-gray-800 w-full text-center z-10 sm:w-96">
                  <div className="text-2xl font-medium">{event.title}</div>
                  <div className="text-gray-300 mb-6 sm:mb-8 sm:text-xs">
                    <span>{event.date}</span>
                  </div>
                  <div className="text-gray-400 font-medium pb-6">Registration deadline: {event.last_date_reg}</div>
                  {
                    ((new Date()) < (new Date(event.last_date_reg))) && <Link
                      className={`${color} text-gray-950 font-medium px-4 py-1 rounded-md mx-auto cursor-pointer hover:text-white`} to={`/event/${event.name}`}
                    >
                      Open
                    </Link>
                  }
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
