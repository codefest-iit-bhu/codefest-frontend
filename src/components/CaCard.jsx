import { useState } from "react";

const CaCard = ({ request, onApprove, onReject }) => {
    const [adminMessage, setAdminMessage] = useState("");
  
    const handleInputChange = (e) => {
      setAdminMessage(e.target.value);
    };
  
    return (
        <div className="backdrop-blur-md bg-gray-700/30 rounded-lg p-6 shadow-lg text-white">
        <h2 className="text-xl font-semibold mb-2">User: {request.user}</h2>
        <p className="mb-1">
          <span className="font-medium">Institute:</span> {request.institute}
        </p>
        <p className="mb-1">
          <span className="font-medium">Description:</span> {request.userDescription}
        </p>
        <p className="mb-4">
          <span className="font-medium">Status:</span> {request.status}
        </p>
        <textarea
          className="w-full border border-gray-300 bg-gray-50/20 rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a message for the user..."
          value={adminMessage}
          onChange={handleInputChange}
        />
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => onApprove(request._id, adminMessage)}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
          >
            Approve
          </button>
          <button
            onClick={() => onReject(request._id, adminMessage)}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
          >
            Reject
          </button>
        </div>
      </div>
    );
  };
  
  export default CaCard;
  