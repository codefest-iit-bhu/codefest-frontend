const UserCard = ({ user, onDelete }) => {
  return (
    <div className="backdrop-blur-md bg-white/20 rounded-lg p-6 shadow-lg text-white">
      <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
      <p className="mb-1">
        <span className="font-medium">Email:</span> {user.email}
      </p>
      <p className="mb-1">
        <span className="font-medium">Role:</span> {user.role}
      </p>
      <p className="mb-1">
        <span className="font-medium">Institute:</span> {user.institute}
      </p>
      <p className="mb-4">
        <span className="font-medium">Phone:</span> {user.phone_num}
      </p>
      <button
        onClick={() => onDelete(user._id)}
        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
      >
        Delete User
      </button>
    </div>
  );
};

export default UserCard;
