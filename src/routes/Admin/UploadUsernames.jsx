import React, { useEffect, useState } from 'react'
import axios from '../../utils/axiosInstance';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';
import { useUser } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const UploadUsernames = () => {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const navigate = useNavigate();

    const submitHandler = async () => {
        try {
            setLoading(true);
            await axios.patch("/winzo/points", {
                text
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            toast.success("Points updated successfully!");
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!user || user.role !== "admin") {
            return navigate("/CA");
        }
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center min-h-screen p-4 bg-[#140B29]">
                <h1 className="text-4xl font-bold mb-10 text-white">Upload Usernames</h1>
                <textarea name="usernames" id="usernames" placeholder="Enter Leaderboard's copied text" className='w-[90%] text-black font-mono md:w-2/3 h-[70vh] mb-5 p-6' value={text} onChange={e => setText(e.target.value)}></textarea>
                {
                    loading ? <Loader /> :
                        <button className='px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 ml-3 font-mono' onClick={submitHandler}>Submit</button>
                }
            </div>
        </>
    )
}

export default UploadUsernames