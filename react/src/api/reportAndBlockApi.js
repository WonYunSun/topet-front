import createAxios from "./createAxios";
import { handleResponse, handleError } from "./ResponseProcess";

class ReportAndBlock {
    constructor() {
        this.axios = createAxios();
    }

    async ReportCommunity(formData, comid) {
        // 게시물 신고
        try {
          const response = await this.axios.post(`/report/${comid}`, formData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          return handleResponse(response);
        } catch (error) {
          handleError(error);
        }
      }
}

export default new ReportAndBlock();