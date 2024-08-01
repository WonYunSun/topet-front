import axios from "axios";

const createAxios = (middlePath = "") => {
  return axios.create({
    // baseURL: `http://localhost:8081/api${middlePath}`,
    baseURL: `http://175.45.202.131:8081/api${middlePath}`,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export default createAxios;