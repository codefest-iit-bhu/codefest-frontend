import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CaCard from "../../components/CaCard";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/context";
import axios from "../../utils/axiosInstance";
import Navbar from "../../components/Navbar";

const AllCaRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user.role !== "admin") {
      return navigate("/CA");
    }

    const fetchRequests = async () => {
      const response = await axios.get("/ca/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRequests(response.data);
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id, msg) => {
    const response = await axios.patch(
      `/ca/${id}`,
      JSON.stringify({
        status: "approved",
        adminMessage: msg,
      }),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      toast.success("Request approved");
      window.location.reload();
    }
  };

  const handleReject = async (id, msg) => {
    const response = await axios.patch(
      `/ca/${id}`,
      JSON.stringify({
        status: "rejected",
        adminMessage: msg,
      }),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      toast.success("Request rejected");
      window.location.reload();
    }
  };

  return (<>
    <Navbar />
    <div className="flex flex-col items-center min-h-screen p-4 bg-[#140B29]">
      <h1 className="text-4xl font-bold mb-10 text-white">All CA Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {requests.map((request) => (
          <CaCard
            key={request.user}
            request={request}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}
      </div>
    </div>
  </>
  );
};

export default AllCaRequests;
