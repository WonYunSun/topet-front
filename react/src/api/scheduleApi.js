import axios from "axios";

// const API_BASE_URL = "http://175.45.202.131:8081/api";
const API_BASE_URL = "http://localhost:8081/api";

class scheduleApi {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async updateScheduleStatus(scheduleId) {
    try {
      const response = await this.client.post(
        `/schedules/postScheduleId/${scheduleId}`,
        {
          scheduleId,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to update schedule status:", error);
      throw error;
    }
  }

  async postSchedule(formData) {
    try {
      const response = await this.client.post(
        `${this.baseURL}/schedule/post`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("서버 오류:", error);
      throw error; // 에러를 다시 던집니다
    }
  }
}

export default new scheduleApi(API_BASE_URL);
