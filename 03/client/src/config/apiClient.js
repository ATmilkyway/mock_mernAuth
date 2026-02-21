import axios from "axios";

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};
const API = axios.create(options);

API.interceptors.response.use(
  (response) => response.data, // success handler
  (error) => {
    // error handler
    const status = error.response?.status;
    const data = error.response?.data;
    return Promise.reject({ status, ...data });
  },
);
export default API;
