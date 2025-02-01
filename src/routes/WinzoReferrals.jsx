import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader'
import axios from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useUser } from '../context/context';
import { useNavigate } from 'react-router-dom';
import { FaCopy } from 'react-icons/fa';

export default function WinzoReferrals() {
    const [loading, setLoading] = useState(false);
    const [referrals, setReferrals] = useState([]);
    const [name, setName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [generating, setGenerating] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchRequest = async () => {
            const response = await axios.get("/ca/my", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (!(response.data && Object.keys(response.data).length > 0)) navigate("/CA");
        };

        if (localStorage.getItem("token")) fetchRequest();
    }, [])

    useEffect(() => {
        const fetchReferrals = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/winzo/referrals',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );

                setReferrals(response.data);
            } catch (error) {
                console.error('Error fetching referrals:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReferrals();
    }, []);

    const handleGenerateUsername = async () => {
        const trimmedName = name.trim();
        if (trimmedName.length < 3 || trimmedName.length > 30) {
            toast.error('Name must be between 3 and 30 characters');
            return;
        }
        setGenerating(true);
        try {
            const response = await axios.post('/winzo/referrals',
                {
                    name: trimmedName
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                }
            );
            setName('');
            setReferrals([...referrals, response.data]);
            toast.success('Username generated successfully');
        }
        catch (error) {
            console.log(error);
        } finally {
            setGenerating(false);
        }
    };

    const filteredReferrals = referrals.filter(referral =>
        referral.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Navbar />
            <main className="bg-[#140B29] flex flex-col items-center w-full min-h-[100vh] p-4">
                <h1 className="font-bold font-mono text-4xl py-3">Winzo Referrals</h1>
                <p className="font-mono mt-5 ">
                    <span className="font-bold text-l text-lime-400">Reward: </span>
                    For each of your referrals who play, you will receive 10 rupees..{" "}
                </p>
                <p className="font-mono mt-5 w-3/4">
                    <span className="font-bold text-l text-lime-500">Instructions: </span>  Generate a unique WinZO username for your referrals and ask them to set it as their WinZO display name. You will earn points only if your referrals play the game using the <span className="font-extrabold text-l text-lime-400">exact </span>generated winzo username.
                </p>

                <div className="mt-4 w-full md:w-3/4 flex">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter referral's name..."
                        className="p-2 flex-grow bg-[#1a0e35] text-white border border-gray-300 rounded-l font-mono"
                        disabled={generating}
                    />
                    <button
                        onClick={handleGenerateUsername}
                        className="p-2 bg-lime-500 text-white border border-l-0 border-gray-300 rounded-r"
                        disabled={generating}
                    >
                        {generating ? 'Generating...' : 'Generate'}
                    </button>
                </div>

                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search referrals..."
                    className="mt-4 p-2 w-full md:w-3/4 bg-[#1a0e35] text-white border border-gray-300 rounded font-mono"
                />

                {loading ? (
                    <Loader />
                ) : (
                    <table className="table-auto border border-gray-300 px-6 w-fit md:px-0 md:w-3/4 mt-4">
                        <thead>
                            <tr className="text-left font-semibold">
                                <th className="px-4 py-2 border-b">Serial No.</th>
                                <th className="px-4 py-2 border-b">Name</th>
                                <th className="px-4 py-2 border-b">Winzo username</th>
                                <th className="px-4 py-2 border-b">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReferrals.map((entry, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className={`font-mono ${index % 2 === 0 ? "bg-[#1a0e35]" : "bg-[#160b2f]"}`}
                                    >
                                        <td className="px-4 py-2 border-b text-sm  ">{index + 1}</td>
                                        <td className="px-4 py-2 border-b text-sm  ">{entry.name}</td>
                                        <td className="px-4 py-2 border-b text-sm ">
                                            <div className='flex items-center'>
                                                {entry.username}
                                                <CopyToClipboard text={entry.username}
                                                    onCopy={() => toast.success("Copied")}

                                                >
                                                    <FaCopy className="ml-2 cursor-pointer text-orange-500 hover:text-orange-600 transition duration-300" />
                                                </CopyToClipboard>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 border-b text-sm ">
                                            {entry.isVerified ? (
                                                <span className="text-green-500">Verified</span>
                                            ) : (
                                                <span className="text-red-500">Not Verified</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </main >
        </>
    )
}
