import createAxios from "./createAxios";

const MID_URL = "/pet";

// const API_BASE_URL =
// "http://localhost:8081/api";
// // "http://175.45.202.131:8081/api";

class petApi {
  // constructor(baseURL) {
  //     this.client = axios.create({
  //     baseURL: baseURL,
  //     });
  // }
  constructor() {
    this.axios = createAxios(MID_URL);
  }

  async getMyPet(id){
      return await
      this.axios.get(`/getMyPet/${id}`, {
          headers: {},  
          withCredentials: true,
      }).then((response) => {
          console.log("서버 응답:", response.data);
          return response.data;
      }).catch((error) => {
          console.error("서버 오류:", error);
          throw error;
      });
    }


  
  async postPetData(petDomain) {
    return await this.axios
      .post("/post", petDomain, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("서버 응답:", response);
        return response;
      })
      .catch((error) => {
        console.error("서버 오류:", error);
        throw error;
      });
  }

  async postAddPet(petCode) {
    return await this.axios
      .post("/postAddPet", {uid :petCode}, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("서버 응답:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("서버 오류:", error);
        throw error;
      });
  }
}
export default new petApi();

