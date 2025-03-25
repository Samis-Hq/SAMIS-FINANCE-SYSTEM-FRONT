import axios from "axios";

const apiClient = axios.create({
  //  baseURL: process.env.VUE_APP_API_BASE_URL,
 baseURL: "http://192.168.40.166:8080/api/students",
  headers: {
    "Content-Type": "application/json",
  },
});
export default apiClient;
