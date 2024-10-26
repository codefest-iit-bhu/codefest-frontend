import GlitchText from '../components/GlitchedCodeFest';
import Link from '../components/Link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen text-white p-10">
      {/* <img src="./glitchedCodeFest.svg" alt="" width={400} /> */}
      <div className="w-[400px]">
      <GlitchText />
      </div>
      <div className="p-3 w-[400px] flex justify-center"><Link text="Explore" href="/home"/></div>
      <div className="p-3 w-[400px] flex justify-center"><Link text="Login" href="/login"/></div>
      <div className="p-3 w-[400px] flex justify-center"><Link text="Signup" href="/signup"/></div>
      <div className="p-3 w-[400px] flex justify-center"><Link text="Campus Ambassdor" href="/CA"/></div>
    </div>
  );
}
