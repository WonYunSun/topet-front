import axios from "axios";

const createAxios = (middlePath = "") => {
  return axios.create({
    baseURL: `http://localhost:8081/api${middlePath}`,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export default createAxios;