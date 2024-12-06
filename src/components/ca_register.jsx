import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CARegistration.module.css";

const CARegistration = () => {
  const [formData, setFormData] = useState({
    institute: "",
    userDescription: "",
  });
  const [userRequests, setUserRequests] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  const apiUrl = "https://codefest-backend-igxy.onrender.com/api/v1/ca-requests"; // Replace with your actual API endpoint

  // Fetch existing requests for the logged-in user
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`, // Assuming JWT is stored in localStorage
          },
        });
        setUserRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setStatusMessage("Error fetching requests.");
      }
    };

    fetchRequests();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        apiUrl,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`, // Assuming JWT is stored in localStorage
          },
        }
      );
      setUserRequests((prev) => [...prev, response.data]);
      setStatusMessage("Request submitted successfully!");
      setFormData({ institute: "", userDescription: "" }); // Reset the form
    } catch (error) {
      console.error("Error submitting request:", error);
      setStatusMessage(error.response?.data.message || "Failed to submit the request. Please try again.");
    }
  };

  // Update the request status to pending
  const handleUpdateStatus = async (id) => {
    try {
      await axios.put(
        `${apiUrl}/${id}`,
        { status: "pending" },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setUserRequests((prev) =>
        prev.map((request) =>
          request._id === id ? { ...request, status: "pending" } : request
        )
      );
      setStatusMessage("Status updated to pending.");
    } catch (error) {
      console.error("Error updating status:", error);
      setStatusMessage("Failed to update the status. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className="text-3xl font-bold">Campus Ambassador Registration</h1>
      <p className="mt-2">Join us as a Campus Ambassador for CodeFest '24!</p>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="institute" className="block text-lg font-medium">
            Institute Name
          </label>
          <input
            type="text"
            id="institute"
            name="institute"
            value={formData.institute}
            onChange={(e) =>
              setFormData({ ...formData, institute: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="userDescription" className="block text-lg font-medium">
            Statement of Purpose
          </label>
          <textarea
            id="userDescription"
            name="userDescription"
            value={formData.userDescription}
            onChange={(e) =>
              setFormData({ ...formData, userDescription: e.target.value })
            }
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          ></textarea>
        </div>

        <button
          type="submit"
          className="mt-4 bg-brown-600 text-white px-6 py-2 rounded-lg hover:bg-vermilion"
        >
          Submit Request
        </button>
      </form>

      {statusMessage && <p className="mt-4 text-green-600">{statusMessage}</p>}

      {/* User Requests */}
      <div className={styles.requests}>
        <h2 className="mt-8 text-2xl font-semibold">Your Requests</h2>
        {userRequests.length > 0 ? (
          <div className={styles.requestList}>
            {userRequests.map((request) => (
              <div key={request._id} className={styles.requestItem}>
                <p>
                  <strong>Institute:</strong> {request.institute}
                </p>
                <p>
                  <strong>Description:</strong> {request.userDescription || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong>
                  <span
                    className={
                      request.status === "approved"
                        ? "text-green-600"
                        : request.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }
                  >
                    {request.status}
                  </span>
                </p>
                {request.status === "rejected" && (
                  <>
                    <p>
                      <strong>Admin Message:</strong>{" "}
                      {request.adminMessage || "N/A"}
                    </p>
                    <button
                      onClick={() => handleUpdateStatus(request._id)}
                      className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                    >
                      Mark as Done
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4">You have not submitted any requests yet.</p>
        )}
      </div>
    </div>
  );
};

export default CARegistration;