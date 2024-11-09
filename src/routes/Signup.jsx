import HeadingA from "../components/HeadingA";
import TextBox from "../components/TextBox";
import AnimatedButton from "../components/AnimatedButton";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Signup() {
  const query=useQuery();
  const userName=query.get('username')

  const [credentials, setCredentials] = useState({
    username:userName,
    password:"",
    confirmPassword:""
  })

  const handleCredentials=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  useEffect(()=>{
    if(!userName){
      alert("Invalid Username")
    }
  },[])

  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="rounded-md flex flex-col items-center py-4 w-[500px] backdrop-blur-[2px]">
          <HeadingA text="eyyy" size="2xl" />
          <TextBox placeholder="Username" name="username" value={credentials.username}/>
          <TextBox placeholder="Password" name="password" value={credentials.password} onChange={handleCredentials}/>
          <TextBox placeholder="Confirm Password" name="confirmPassword" value={credentials.confirmPassword} onChange={handleCredentials}/>
          <AnimatedButton text="Signup >"/>
        <a href="/login" className="text-gray-400 text-md underline underline-offset-2">Already have an account? Click here</a>
        </div>
      </div>
    </>
  );
}
