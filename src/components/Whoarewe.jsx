import { Link } from "react-router-dom";
import { useUser } from "../context/context";

export default function Whoarewe() {
  const { isAuthenticated } = useUser();
  return (
    <>
      <div className="w-full flex items-center justify-center my-10">
        <div className="relative w-full md:w-[50vw] h-fit flex flex-col items-center justify-center">
          <div className="w-[80%] h-[15vw] md:h-[10vw] absolute top-[16vw] md:top-[11vw] overflow-y-scroll no-scrollbar text-black">
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
          <img src="aByteAboutUs.png" alt="" className="w-full" />
          {
            !isAuthenticated &&
            <div className="absolute w-fit h-[6.5vw] md:h-[4vw] bottom-[0.5vw] flex items-center">
              <Link to="/login" className="inline-block h-full">
                <img
                  src="registerLoginButton.png"
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
