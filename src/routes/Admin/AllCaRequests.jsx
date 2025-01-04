import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CaCard from "../../components/CaCard";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/context";
import axios from "../../utils/axiosInstance";
import Navbar from "../../components/Navbar";
import { CSVLink } from "react-csv"; // Import CSVLink
import Search from "../../components/Search";

const AllCaRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("pending")

  const filter = (req) => {
    return (req.user.name.toLowerCase().includes(search.toLowerCase()) || req.institute.toLowerCase().includes(search.toLowerCase())) && (status === "all" || status === req.status)
  }

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

    { label: "Name", key: "user" },
    { label: "Graduation Year", key: "graduation_year" },
    { label: "Contact Number", key: "contact_number" },
    { label: "WhatsApp Number", key: "whatsapp_number" },
    { label: "Branch", key: "branch" },
    { label: "Referred By", key: "ca_brought_by" },
    { label: "Referral Code", key: "referralCode" },
    { label: "Status", key: "status" },
  ];

  const csvData = requests.map((request) => ({
    user: request.user.name || "N/A",
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
        <div className="flex gap-3 items-center font-mono w-2/3 mb-5">
          <label htmlFor="role">Status: </label>
          <select name="status" id="status" value={status} onChange={e => setStatus(e.target.value)} className="p-3 rounded-lg text-black">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <Search search={search} setSearch={setSearch} placeholder={"Search using name or institute"} />
        </div>
        <div>
          <button className="bg-orange-500 px-3 py-2 text-white font-mono rounded-lg mb-6">
            {requests.filter(filter).length} results
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {requests.filter(filter).map((request) => (
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
