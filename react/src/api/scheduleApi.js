import axios from "axios";

const API_BASE_URL = "http://175.45.202.131:8081/api";

class ScheduleService {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
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

  async postSche(formData) {
    try {
      const response = await this.client.post("/schedule/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("서버 오류:", error);
    }
  }
}

export default new ScheduleService(API_BASE_URL);
