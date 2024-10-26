import HeadingA from "../components/HeadingA";
import TextBox from "../components/TextBox";
import AnimatedButton from "../components/AnimatedButton";

export default function Signup() {
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="rounded-md flex flex-col items-center py-4 w-[500px] backdrop-blur-[2px]">
          <HeadingA text="eyyy" size="2xl" />
          <TextBox placeholder="Username"/>
          <TextBox placeholder="Password"/>
          <TextBox placeholder="Confirm Password"/>
          <AnimatedButton text="Signup >"/>
        <a href="/login" className="text-gray-400 text-md underline underline-offset-2">Already have an account? Click here</a>
        </div>
      </div>
    </>
  );
}
