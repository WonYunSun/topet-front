import createAxios from "./baseAxios";
import { handleResponse, handleError } from "./ResponseProcess";

const MID_URL = "/like";

class CommunityLikesApi {
  constructor() {
    this.axios = createAxios(MID_URL);
  }

  async fetchLikedByCurrentUser(comid) {
    // 게시물 디테일 좋아요 여부 불러오기
    try {
      const response = await this.axios.get(`/detail/${comid}`);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  async postLike(comid) {
    try {
      const response = await this.axios.post(`/${comid}`, {});
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }
}

export default CommunityLikesApi;
