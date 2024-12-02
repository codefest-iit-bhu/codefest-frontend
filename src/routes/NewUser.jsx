import React, { useState } from 'react'
import HeadingA from '../components/HeadingA'
import TextBox from '../components/TextBox'
import AnimatedButton from '../components/AnimatedButton'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'

export default function NewUser() {
    const [Username, setUsername] = useState("")
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUsername(e.target.value);
    }

    const { data, error, isLoading, refetch } = useQuery(
        'checkUsername',
        async () => {
            const response = await axios.get(`http://localhost:8080/api/auth/check_user/${Username}`);
            return response.data;
        },
        {
            enabled: false,
            onSuccess: (data) => {
                if (!data.userExists) {
                    navigate(`/signup?username=${Username}`);
                } else {
                    toast.error("User Already Exists");
                }
            }
        }
    );

    const checkUser = () => {
        if (Username) {
            refetch();
        } else {
            alert("Please enter a username");
        }
    };


    return (
        <>
            <div className="w-[100vw] h-[100vh] flex justify-center items-center">
                <div className="rounded-md flex flex-col items-center py-4 w-[500px] backdrop-blur-[2px]">
                    <HeadingA text="Check User" size="2xl" />
                    <TextBox value={Username} onChange={handleChange} placeholder="Username" />
                    <AnimatedButton onClick={checkUser} text="Continue >" />
                </div>
            </div>
        </>
    )
}
