export default function Whoarewe() {
  return (
    <div className="text-black py-12 flex flex-col ">
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
    </div>
  );
}
