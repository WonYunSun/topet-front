import createAxios from "./createAxios";
import { handleResponse, handleError } from "./ResponseProcess";

const MID_URL = "/comment";

class CommentApi {
  constructor() {
    this.axios = createAxios(MID_URL);
  }

  async postComment(comid, formData) {
    // 댓글 보내기
    try {
      const response = await this.axios.post(`/post/${comid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  async updateComment(formData) {
    // 댓글 수정
    try {
      const response = await this.axios.post(`/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  async deleteComment(commentid) {
    // 댓글 삭제
    try {
      const response = await this.axios.post(`/delete/${commentid}`, {});
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  async fetchComment(comid) {
    // 댓글 불러오기(답글 같이 불러와짐)
    try {
      const response = await this.axios.get(`/get/${comid} `);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  async fetchMyComment(){
    try {
      const response = await this.axios.get('/myComment');
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  async postReplyComment(comid, formData) {
    // 답글 작성
    try {
      const response = await this.axios.post(`/post/${comid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  async updateReply(formData) {
    // 답글 수정
    try {
      const response = await this.axios.post(`/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  async deleteReply(replyId) {
    // 답글 삭제
    try {
      const response = await this.axios.post(`/delete/${replyId}`, {});
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }
}

export default new CommentApi();
