import { useEffect, useState } from "react";
import api from "../../api";
import toast from "react-hot-toast";
import UserCard from "../../components/UserCard";
import { useNavigate } from "react-router-dom";

const ALL_USERS_URL = "/user/all";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(ALL_USERS_URL, {
          withCredentials: true,
        });
        setUsers(response.data);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
        navigate("/login");
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/user/${id}`, {
        withCredentials: true,
      });
      if(response.status === 200) {
        toast.success(response.data.message);
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
    <div className="p-6 flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold text-white drop-shadow-lg">
        All Users
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
