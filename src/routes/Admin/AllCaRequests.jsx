import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CaCard from "../../components/CaCard";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/context";
import axios from "../../utils/axiosInstance";
import Navbar from "../../components/Navbar";
import { CSVLink } from "react-csv"; // Import CSVLink

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

  // Prepare data for CSV export
  const csvHeaders = [
    { label: "Graduation Year", key: "graduation_year" },
    { label: "Contact Number", key: "contact_number" },
    { label: "WhatsApp Number", key: "whatsapp_number" },
    { label: "Branch", key: "branch" },
    { label: "Referred By", key: "ca_brought_by" },
    { label: "Referral Code", key: "referralCode" },
    { label: "Status", key: "status" },
  ];

  const csvData = requests.map((request) => ({
    graduation_year: request.graduation_year || "N/A",
    contact_number: request.contact_number || "N/A",
    whatsapp_number: request.whatsapp_number || "N/A",
    branch: request.branch || "N/A",
    ca_brought_by: request.ca_brought_by || "N/A",
    referralCode: request.referralCode || "N/A",
    status: request.status || "N/A",
  }));

  const fileName = `CAReqTill${new Date().toISOString().split("T")[0]}.csv`;

  return (
    <>
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
        <div className="mt-10">
          <CSVLink
            headers={csvHeaders}
            data={csvData}
            filename={fileName}
            className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Download CSV
          </CSVLink>
        </div>
      </div>
    </>
  );
};

export default AllCaRequests;
