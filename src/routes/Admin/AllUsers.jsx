import { useEffect, useState } from "react";
import api from "../../api";
import toast from "react-hot-toast";
import UserCard from "../../components/UserCard";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("/user/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const response = await axios.delete(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      toast.success(response.data.message);
      window.location.reload();
    }
  };

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold text-white drop-shadow-lg">All Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {users.map((user) => (
          <UserCard key={user._id} user={user} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default AllUsers;
