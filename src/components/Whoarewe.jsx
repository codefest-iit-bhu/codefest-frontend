export default function Whoarewe() {
  return (
    <>
      <div className="w-full flex items-center justify-center font-mono sm:scale-[80%] md:scale-100 lg:scale-75 mt-4 sm:mt-0 xl:-mt-12">
        <div className="relative w-full md:w-[50vw] h-fit flex flex-col items-center justify-center">
          <div className="w-[70%] md:w-[70%] lg:text-xl max-[500px]:h-[40vw] max-[500px]:top-[14vw] h-[45vw] md:h-[28vw] absolute top-[16vw] md:top-[10vw] min-[1600px]:h-[450px] min-[1600px]:top-[160px] min-[1600px]:w-[550px] overflow-y-scroll no-scrollbar text-black">
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
        </div>
      </div>
    </>
  );
}
