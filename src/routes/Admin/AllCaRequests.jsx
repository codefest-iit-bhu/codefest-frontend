import { useEffect, useState } from "react";
import api from "../../api";
import toast from "react-hot-toast";
import CaCard from "../../components/CaCard";
import { useNavigate } from "react-router-dom";

const ALL_REQUESTS_URL = "/ca/all";

const AllCaRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get(ALL_REQUESTS_URL, {
          withCredentials: true,
        });
        setRequests(response.data);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
        navigate("/login");
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id, msg) => {
    try {
      const response = await api.patch(
        `/ca/${id}`,
        JSON.stringify({
          status: "approved",
          adminMessage: msg,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Request approved");
        window.location.reload();
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleReject = async (id, msg) => {
    try {
        const response = await api.patch(
          `/ca/${id}`,
          JSON.stringify({
            status: "rejected",
            adminMessage: msg,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          toast.success("Request rejected");
          window.location.reload();
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
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
  );
};

export default AllCaRequests;
