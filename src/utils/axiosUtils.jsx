import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:4000",
  baseURL: "https://z-pay-server.adaptable.app",
});

export default axiosInstance;
