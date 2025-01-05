import React, { useState, useEffect } from "react";
import styles from "./CARegistration.module.css";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CARegistration = () => {
  const [formData, setFormData] = useState({
    institute: "",
    userDescription: "",
    graduation_year: "",
    contact_number: "",
    whatsapp_number: "",
    branch: "",
    ca_brought_by: "",
  });
  const [userRequest, setUserRequest] = useState({});
  const [referralLink, setReferralLink] = useState("");

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
        graduation_year: response.data.graduation_year || "",
        contact_number: response.data.contact_number || "",
        whatsapp_number: response.data.whatsapp_number || "",
        branch: response.data.branch || "",
        ca_brought_by: response.data.ca_brought_by || "",
      });
      setReferralLink(window.location.origin + "/signup?referralCode=" + response.data.referralCode);
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
    setUserRequest(updatedRequest.data ? updatedRequest.data : {});
    window.location.reload();
  };

  return (
    <div
      className={`${styles.container} font-pixelifySans bg-[rgba(20,11,41,1)] text-white p-8 rounded-lg`}
    >
      <h1 className="text-3xl font-bold">Campus Ambassador Registration</h1>
      <p className="mt-2">Join us as a Campus Ambassador for CodeFest'25!</p>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Original Fields */}
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black font-mono"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label
            htmlFor="userDescription"
            className="block text-lg font-medium"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black font-mono"
          ></textarea>
        </div>

        {/* New Fields */}
        {[
          { label: "Graduation Year", id: "graduation_year", type: "number" },
          { label: "Contact Number", id: "contact_number", type: "tel" },
          { label: "WhatsApp Number", id: "whatsapp_number", type: "tel" },
          { label: "Branch", id: "branch", type: "text" },
          { label: "Referred By", id: "ca_brought_by", type: "text" },
        ].map((field) => (
          <div key={field.id} className={styles.formGroup}>
            <label htmlFor={field.id} className="block text-lg font-medium">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              name={field.id}
              value={formData[field.id]}
              onChange={(e) =>
                setFormData({ ...formData, [field.id]: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black font-mono"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 bg-brown-600 text-white px-6 py-2 rounded-lg hover:bg-vermilion"
        >
          {userRequest && Object.keys(userRequest).length > 0
            ? "Update Request"
            : "Submit Request"}
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
              {
                userRequest.status === "approved" &&
                <div className="text-black font-mono">
                  <div className="font-bold">Referral Link: </div>
                  <div className="flex gap-2">
                    <span className="w-3/4 py-1 px-2 border">
                      {referralLink}
                    </span>
                    <CopyToClipboard text={referralLink}
                      onCopy={() => toast.success("Copied")}>
                      <button className="cursor-pointer py-1 px-2 bg-orange-500 text-white rounded-lg">Copy</button>
                    </CopyToClipboard>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">(Share this link with new users (10 points) for signing up and make referred members participate in codefest events (2 points))</p>
                </div>
              }
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