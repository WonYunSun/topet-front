// import axios from "axios";
import createAxios from "./createAxios";

// // const API_BASE_URL = "http://175.45.202.131:8081/api";
// const API_BASE_URL = "http://localhost:8081/api";

const MID_URL = "/schedule";

class scheduleApi {
  // constructor(baseURL) {
  //   this.baseURL = baseURL;
  // }
  constructor() {
    this.axios = createAxios(MID_URL);
  }

  async updateScheduleStatus(item) {
    try {
      const response = await this.axios.post(`/post/status/${item.id}`, item, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to update schedule status:", error);
      throw error;
    }
  }

  async updateSchedule(id, formData){
    try{
      const response = await this.axios.post(`/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    }catch(error){
      console.log(error);
      throw error;
    }
  }

  async postSchedule(formData) {
    try {
      const response = await this.axios.post(`/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("서버 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("서버 오류:", error);
      throw error; // 에러를 다시 던집니다
    }
  }

  async getPetScheduleAPI(id) {
    try {
      const response = await this.axios.get(`/get/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      //console.log("서버 응답 ", response.data);
      return response.data;
    } catch (error) {
      console.log("서버 응답 에러 : ", error);
    }
  }
}

export default new scheduleApi();
