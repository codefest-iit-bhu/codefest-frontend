import React, { useState, useEffect } from "react";
import styles from "./CARegistration.module.css";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { CopyToClipboard } from "react-copy-to-clipboard";
import carBg from "../assets/CA_images/CArbg.webp";
import Spinner from "./Spinner";

// Custom Input Component for consistent styling
const CustomInput = ({
  label,
  id,
  type,
  value,
  onChange,
  required = true,
  placeholder = "",
  isTextArea = false,
  disabled = false, 
}) => (
  <div className="mb-6">
    <label
      htmlFor={id}
      className="block text-xl md:text-2xl font-serif text-white mb-2 tracking-wide"
    >
      {label}
    </label>
    {isTextArea ? (
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        rows="3"
        className="w-full bg-[#8B7D5B] rounded-2xl border-none px-4 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-300 text-lg shadow-inner"
      ></textarea>
    ) : (
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-[#8B7D5B] rounded-full border-none h-12 px-6 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-300 text-lg shadow-inner"
      />
    )}
  </div>
);

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
      try {
        const response = await axios.get("/ca/my", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data) {
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
          setReferralLink(
            window.location.origin +
            "/signup?referralCode=" +
            response.data.referralCode
          );
        }
      } catch (error) {
        console.error("Error fetching request:", error);
      }
    };

    fetchRequest();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); 
    try {
      if (userRequest && Object.keys(userRequest).length > 0) {
        await handleUpdateStatus(userRequest._id);
      } else {
        const response = await axios.post("/ca", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserRequest(response.data);
        toast.success("Request submitted successfully");
      }
    } catch (error) {
      toast.error("Error submitting request");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id) => {
    try {
      const updatedRequest = await axios.patch(
        `/ca/${id}`,
        { ...formData, status: "pending" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Details updated");
      setUserRequest(updatedRequest.data ? updatedRequest.data : {});
      // window.location.reload();
    } catch (error) {
      toast.error("Error updating status");
    }
  };
  
  const showRequestButton =
    !userRequest ||
    Object.keys(userRequest).length === 0 ||
    userRequest.status === "pending" ||
    userRequest.status === "rejected";
    

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed bg-no-repeat overflow-x-hidden md:px-0 scrollbar-hide"
      style={{ backgroundImage: `url(${carBg})` }}
    >
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-rye text-[#FFC107] drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] mb-4 tracking-wider">
            CAMPUS AMBASSADOR REGISTRATION
          </h1>
          <p className="text-white text-lg md:text-xl font-serif italic opacity-90 tracking-widest">
            Join us as a campus ambassador for codefest'26
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`space-y-2 md:space-y-4 ${
            !showRequestButton ? "pointer-events-none opacity-80" : ""
          }`}
        >
          <CustomInput
            label="Institute Name"
            id="institute"
            type="text"
            value={formData.institute}
            disabled={!showRequestButton || isSubmitting}
            onChange={(e) =>
              setFormData({ ...formData, institute: e.target.value })
            }
          />

          <CustomInput
            label="Statement of purpose"
            id="userDescription"
            type="text"
            isTextArea={true}
            value={formData.userDescription}
            disabled={!showRequestButton || isSubmitting}
            onChange={(e) =>
              setFormData({ ...formData, userDescription: e.target.value })
            }
          />

          <CustomInput
            label="Graduation Year"
            id="graduation_year"
            type="number"
            value={formData.graduation_year}
            disabled={!showRequestButton || isSubmitting}
            onChange={(e) =>
              setFormData({ ...formData, graduation_year: e.target.value })
            }
          />

          <CustomInput
            label="Contact Number"
            id="contact_number"
            type="tel"
            value={formData.contact_number}
            disabled={!showRequestButton || isSubmitting}
            onChange={(e) =>
              setFormData({ ...formData, contact_number: e.target.value })
            }
          />

          <CustomInput
            label="Whatsapp Number"
            id="whatsapp_number"
            type="tel"
            value={formData.whatsapp_number}
            disabled={!showRequestButton || isSubmitting}
            onChange={(e) =>
              setFormData({ ...formData, whatsapp_number: e.target.value })
            }
          />

          <CustomInput
            label="Branch"
            id="branch"
            type="text"
            value={formData.branch}
            disabled={!showRequestButton || isSubmitting}
            onChange={(e) =>
              setFormData({ ...formData, branch: e.target.value })
            }
          />

          <CustomInput
            label="Referred By (Enter their referral code)"
            id="ca_brought_by"
            type="text"
            value={formData.ca_brought_by}
            placeholder="Referral Code"
            required={false}
            disabled={!showRequestButton || isSubmitting}
            onChange={(e) =>
              setFormData({ ...formData, ca_brought_by: e.target.value })
            }
          />

          {showRequestButton && (
            <div className="flex justify-center mt-8 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-yellow-600/90 hover:bg-yellow-700 text-white font-rye text-xl py-3 px-12 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(234,179,8,0.5)] border-2 border-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed" 
              >
                {isSubmitting ? (
                  <Spinner/>
                ) : (
                  userRequest && Object.keys(userRequest).length > 0
                    ? "Update Request"
                    : "Submit Request"
                )}
              </button>
            </div>
          )}
        </form>

        {/* User Requests Section - Kept consistent with new theme but simple */}
        {userRequest && Object.keys(userRequest).length > 0 && (
          <div className="mt-16 bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-yellow-500/30">
            <h2 className="text-2xl font-rye text-[#FFC107] mb-6 text-center">
              Your Request Status
            </h2>
            <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700">
              <p className="text-white text-lg mb-4">
                <strong className="text-yellow-500">Status: </strong>
                <span
                  className={`${
                    userRequest.status === "approved"
                      ? "text-green-400"
                      : userRequest.status === "rejected"
                      ? "text-red-400"
                      : "text-yellow-400"
                  } font-bold uppercase tracking-wider`}
                >
                  {userRequest.status}
                </span>
              </p>

              {userRequest.status === "approved" && (
                <div className="space-y-4">
                  <div>
                    <div className="font-bold text-yellow-500 text-lg mb-2">
                      Referral Link:
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="flex-1 bg-gray-900/50 p-2 rounded text-gray-300 font-mono text-sm break-all border border-gray-600">
                        {referralLink}
                      </div>
                      <CopyToClipboard
                        text={referralLink}
                        onCopy={() => toast.success("Copied")}
                      >
                        <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded transition-colors font-bold">
                          Copy
                        </button>
                      </CopyToClipboard>
                    </div>
                  </div>

                  <div className="bg-blue-900/20 p-4 rounded border border-blue-500/30 text-sm text-gray-200">
                    <p>
                      Share this link to earn 20 points for signups and 10
                      points for event participation!
                    </p>
                  </div>

                  <div>
                    <div className="flex gap-2 items-center text-lg">
                      <span className="font-bold text-yellow-500">
                        Referral Code:
                      </span>
                      <span className="font-mono text-white bg-gray-700 px-2 py-1 rounded">
                        {referralLink.split("=")[1]}
                      </span>
                      <CopyToClipboard
                        text={referralLink.split("=")[1]}
                        onCopy={() => toast.success("Copied")}
                      >
                        <button className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-3 py-1 rounded transition-colors font-bold ml-2">
                          Copy
                        </button>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              )}

              {userRequest.status === "rejected" && (
                <div className="mt-4">
                  <p className="text-white mb-4">
                    <strong className="text-red-400">Admin Message:</strong>{" "}
                    {userRequest.adminMessage || "N/A"}
                  </p>
                  <button
                    onClick={() => handleUpdateStatus(userRequest._id)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-6 py-2 rounded-lg transition-transform hover:scale-105"
                  >
                    Mark as Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

};

export default CARegistration;