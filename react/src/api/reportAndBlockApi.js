import createAxios from "./createAxios";
import { handleResponse, handleError } from "./ResponseProcess";

class ReportAndBlock {
    constructor() {
        this.axios = createAxios();
    }

    async ReportCommunity(formData, comid) {
        // 게시물 신고
        try {
          const response = await this.axios.post(`/report/?type=community&id=${comid}`, formData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          return handleResponse(response);
        } catch (error) {
          handleError(error);
        }
      }

      async ReportComment(formData, commentid) {
        // 게시물 신고
        try {
          const response = await this.axios.post(`/report/?type=comment&id=${commentid}`, formData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          return handleResponse(response);
        } catch (error) {
          handleError(error);
        }
      }

      async BlockUser(blockerId, blockedId) {
        try {
          const response = await this.axios.post(`/block/?blockerId=${blockerId}&blockedId=${blockedId}`, {
            headers: {
              "Content-Type": "application/json",
            }
          });
          return handleResponse(response);
        } catch (error) {
          handleError(error);
        }
      }
}

export default new ReportAndBlock();