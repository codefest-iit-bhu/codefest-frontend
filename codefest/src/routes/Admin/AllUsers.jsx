import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserCard from "../../components/UserCard";
import axios from "../../utils/axiosInstance";
import Search from "../../components/Search";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");

  const filter = user => (user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())) && (role === "all" || user.role === role)

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
    <div className="p-6 flex flex-col items-center gap-6 bg-black min-h-[100vh]">
      <h1 className="text-3xl font-bold text-white drop-shadow-lg">All Users</h1>
      <div className="flex gap-3 items-center font-mono w-2/3">
        <label htmlFor="role">Role: </label>
        <select name="role" id="role" value={role} onChange={e => setRole(e.target.value)} className="p-3 rounded-lg text-black">
          <option value="all">All</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <Search search={search} setSearch={setSearch} placeholder={"Search using name or email"} />
      </div>
      <div>
        <button className="bg-orange-500 px-3 py-2 text-white font-mono">
          {users.filter(filter).length} results
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {users.filter(filter).map((user) => (
          <UserCard key={user._id} user={user} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default AllUsers;
