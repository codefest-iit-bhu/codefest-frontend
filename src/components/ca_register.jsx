import React, { useState, useEffect } from "react";
import styles from "./CARegistration.module.css";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";

const CARegistration = () => {
  const [formData, setFormData] = useState({
    institute: "",
    userDescription: "",
  });
  const [userRequest, setUserRequest] = useState({});

  useEffect(() => {
    const fetchRequest = async () => {
      const response = await axios.get("/ca/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserRequest(response.data);
      setFormData({
        institute: response.data.institute || "",
        userDescription: response.data.userDescription || "",
      });
    };

    fetchRequest();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userRequest && Object.keys(userRequest).length > 0) {
      handleUpdateStatus(userRequest._id);
    } else {
      const response = await axios.post("/ca", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserRequest(response.data);
      toast.success("Request submitted successfully");
    }
  };

  // Update the request status to pending
  const handleUpdateStatus = async (id) => {
    const updatedRequest = await axios.patch(
      `/ca/${id}`,
      { ...formData, status: "pending" },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    toast.success("Status updated");
    setUserRequest(updatedRequest.body ? updatedRequest.body : {});
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <h1 className="text-3xl font-bold">Campus Ambassador Registration</h1>
      <p className="mt-2 font-mono">Join us as a Campus Ambassador for CodeFest '24!</p>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="institute" className="block text-lg font-medium font-mono">
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
            className="mt-1 font-mono block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label
            htmlFor="userDescription"
            className="block text-lg font-medium font-mono"
          >
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
            className="mt-1 font-mono block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          ></textarea>
        </div>

        <button
          type="submit"
          className="mt-4 font-bold bg-brown-600 text-white px-6 py-2 rounded-lg hover:bg-vermilion"
        >
          {(userRequest && Object.keys(userRequest).length > 0) ? "Update Request" : "Submit Request"}
        </button>
      </form>

      {/* User Requests */}
      <div className={styles.requests}>
        <h2 className="mt-8 text-2xl font-semibold">Your Requests</h2>
        {(userRequest && Object.keys(userRequest).length > 0) ? (
          <div className={styles.requestList}>
            <div key={userRequest._id} className={styles.requestItem}>
              <p className="text-black font-mono">
                <strong>Status: </strong>
                <span
                  className={`
                    ${userRequest.status === "approved"
                      ? "text-green-600"
                      : userRequest.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"} font-mono`
                  }
                >
                  {userRequest.status}
                </span>
              </p>
              {userRequest.status === "rejected" && (
                <>
                  <p className="text-black font-mono">
                    <strong>Admin Message:</strong>{" "}
                    {userRequest.adminMessage || "N/A"}
                  </p>
                  <button
                    onClick={() => handleUpdateStatus(userRequest._id)}
                    className="mt-2 bg-yellow-500 font-bold text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Mark as Done
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <p className="mt-4 font-mono">You have not submitted request yet.</p>
        )}
      </div>
    </div>
  );
};

export default CARegistration;
