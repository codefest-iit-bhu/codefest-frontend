import axios from "axios";

const api = axios.create({
  baseURL: "https://codefest-backend-igxy.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
