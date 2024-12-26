import { useState } from "react";

const CaCard = ({ request, onApprove, onReject }) => {
  const [adminMessage, setAdminMessage] = useState(request.adminMessage);

  const handleInputChange = (e) => {
    setAdminMessage(e.target.value);
  };

  return (
    <div className="backdrop-blur-md bg-gray-700/30 rounded-lg p-6 shadow-lg text-white font-mono">
      <h2 className="text-xl font-semibold mb-2">User: {request.user.name}</h2>
      <p className="mb-1">
        <span className="font-semibold">Institute:</span> {request.institute}
      </p>
      <p className="mb-1">
        <span className="font-semibold">SoP:</span>{" "}
        {request.userDescription}
      </p>

      {/* New Fields */}
      {[
        { label: "Graduation Year", key: "graduation_year" },
        { label: "Contact Number", key: "contact_number" },
        { label: "WhatsApp Number", key: "whatsapp_number" },
        { label: "Branch", key: "branch" },
        { label: "Referred By", key: "ca_brought_by" },
        { label: "Referral Code", key: "referralCode" },
      ].map((field) => (
        <p className="mb-1" key={field.key}>
          <span className="font-semibold">{field.label}:</span>{" "}
          {request[field.key]}
        </p>
      ))}

      {
        request.adminMessage &&
        <p className="mb-1">
          <span className="font-semibold">My Feedback:</span>{" "}
          {request.adminMessage}
        </p>
      }
      <p className="mb-4">
        <span className="font-medium">Status:</span> <span className={`${request.status === "approved"
          ? "text-green-600"
          : request.status === "rejected"
            ? "text-red-600"
            : "text-yellow-600"}`}>{request["status"]}</span>
      </p>
      <textarea
        className="w-full border border-gray-300 bg-gray-50/20 rounded-lg p-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
