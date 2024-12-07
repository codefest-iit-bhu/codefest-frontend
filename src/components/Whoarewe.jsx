import { Link } from "react-router-dom";
import { useUser } from "../context/context";

export default function Whoarewe() {
  const { isAuthenticated } = useUser();
  return (
    <>
      <div className="w-full flex items-center justify-center my-10">
        <div className="relative w-full md:w-[50vw] h-fit flex flex-col items-center justify-center">
          <div className="w-[70%] md:w-[70%] text-[12px] md:text-xl max-[500px]:h-[40vw] max-[500px]:top-[14vw] h-[45vw] md:h-[28vw] absolute top-[16vw] md:top-[10vw] min-[1600px]:h-[450px] min-[1600px]:top-[160px] min-[1600px]:w-[550px] overflow-y-scroll no-scrollbar text-black">
            <p>
              The{" "}
              <span className="font-semibold">
                Department of Computer Science and Engineering, IIT (BHU)
                Varanasi
              </span>{" "}
              brings to you yet another edition of its annual coding
              extravaganza, CodeFest!
            </p>
            <p>
              Being more diverse than ever,{" "}
              <span className="font-semibold">CodeFest '25</span> boasts of a
              plethora of events, ranging from competitive programming,
              algorithms and application development to upcoming trends like
              cryptography, machine learning, computer vision and cyber
              security.
            </p>
            <p>
              With problems being of varying difficulty levels, CodeFest
              provides the perfect platform for fresh enthusiasts, as well as
              the experienced ones, to code together and compete for ultimate
              glory.
            </p>
          </div>
          <img src="aByteAboutUs.svg" alt="" className="w-[800px] left-auto" />
          {
            !isAuthenticated &&
            <div className="absolute w-fit h-[10vw] md:h-[4vw] bottom-[-80px] md:bottom-[-150px] flex items-center">
              <Link to="/login" className="inline-block h-full">
                <img
                  src="registerLoginButton2.svg"
                  alt=""
                  className="h-full hover:scale-110"
                />
              </Link>
            </div>
          }
        </div>
      </div>
    </>
  );
}

{
  /* <div className="text-black py-12 flex flex-col ">
      <div className="bg-gray-400 w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mb-8"></div>
      <div className="p-5 bg-gray-400 max-w-2xl text-black-700 text-center space-y-4 rounded-tr-xl">
        <p>
          The{" "}
          <span className="font-semibold">
            Department of Computer Science and Engineering, IIT (BHU) Varanasi
          </span>{" "}
          brings to you yet another edition of its annual coding extravaganza,
          CodeFest!
        </p>
        <p>
          Being more diverse than ever,{" "}
          <span className="font-semibold">CodeFest '25</span> boasts of a
          plethora of events, ranging from competitive programming, algorithms
          and application development to upcoming trends like cryptography,
          machine learning, computer vision and cyber security.
        </p>
        <p>
          With problems being of varying difficulty levels, CodeFest provides
          the perfect platform for fresh enthusiasts, as well as the experienced
          ones, to code together and compete for ultimate glory.
        </p>
      </div>
    </div> */
}
