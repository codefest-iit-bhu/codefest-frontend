import HeadingA from "../components/HeadingA";
import TextBox from "../components/TextBox";
import AnimatedButton from "../components/AnimatedButton";

export default function Login() {
  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="rounded-md flex flex-col items-center py-4 w-[500px] backdrop-blur-[2px]">
          <HeadingA text="weee" size="2xl" />
          <TextBox placeholder="Username"/>
          <TextBox placeholder="Password"/>
          <AnimatedButton text="Login >"/>
        <a href="/signup" className="text-gray-400 text-md underline underline-offset-2">Dont have an account? Click here</a>
        </div>
      </div>
    </>
  );
}
