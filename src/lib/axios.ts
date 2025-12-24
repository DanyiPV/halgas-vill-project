
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://www.halgasvill.hu/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true,
});

export default axiosClient;
