import createAxios from "./createAxios";
import { handleResponse, handleError } from "./ResponseProcess";

const MID_URL = "/community";

class CommunityApi {
  constructor() {
    this.axios = createAxios(MID_URL);
  }

  async postCommunity(selectedPhotos, formData) {
    // 게시물 작성
    selectedPhotos.slice(0, 5).forEach((photo, index) => {
      formData.append("photos", photo);
    });

    try {
      const response = await this.axios.post(`/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      return handleResponse(response);
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  }

  async editCommunity(selectedPhotos, formData, comid) {
    // 게시물 수정
    selectedPhotos.slice(0, 5).forEach((photo, index) => {
      formData.append("photos", photo);
    });

    try {
      const response = await this.axios.post(`/update/${comid}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  async deleteCommunity(comid) {
    // 게시물 삭제
    try {
      const response = await this.axios.post(`/delete/${comid}`, {});
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  async fetchCommunityPosts(type, category, page, size) {
    // 게시물 리스트 최신순 불러오기(+무한스크롤)
    try {
      const response = await this.axios.get(
        `/${type}/${category}?page=${size}&size=${page}`
      );
      return response.data;
    } catch (error) {
      console.error("서버 오류:", error);
      throw error;
    }
  }

  async fetchSortLikeCommunityPosts(type, category, page, size) {
    // 게시물 리스트 좋아요순 불러오기(+무한스크롤)
    try {
      const response = await this.axios.get(
        `/${type}/${category}?page=${size}&size=${page}&orderby=likes`
      );
      return response.data;
    } catch (error) {
      console.error("서버 오류:", error);
      throw error;
    }
  }

  async fetchTitleContentSearchCommunityPosts(type, category, page, size, searchText) {
    // 게시물 제목+본문 검색 최신순 불러오기(+무한스크롤)
    try {
      const response = await this.axios.get(
       `/${type}/${category}?page=${size}&size=${page}&title=${searchText}`
      );
      return response.data;
    } catch (error) {
      console.error("서버 오류:", error);
      throw error;
    }
  }

  async fetchTitleContentSearchSortLikeCommunityPosts(type, category, page, size, searchText) {
    // 게시물 제목+본문 검색 좋아요순 불러오기(+무한스크롤)
    try {
      const response = await this.axios.get(
        `/${type}/${category}?page=${size}&size=${page}&title=${searchText}&orderby=likes`
      );
      return response.data;
    } catch (error) {
      console.error("서버 오류:", error);
      throw error;
    }
  }

  async fetchHashTagSearchCommunityPosts(type, category, page, size, searchText) {
    // 게시물 해시태그 검색 최신순 불러오기(+무한스크롤)
    try {
      const response = await this.axios.get(
       `/${type}/${category}?page=${size}&size=${page}&hashtag=${searchText}`
      );
      return response.data;
    } catch (error) {
      console.error("서버 오류:", error);
      throw error;
    }
  }

  async fetchHashTagSearchSortLikeCommunityPosts(type, category, page, size, searchText) {
    // 게시물 해시태그 검색 좋아요순 불러오기(+무한스크롤)
    try {
      const response = await this.axios.get(
        `/${type}/${category}?page=${size}&size=${page}&hashtag=${searchText}&orderby=likes`
      );
      return response.data;
    } catch (error) {
      console.error("서버 오류:", error);
      throw error;
    }
  }

  async fetchCommunityDetail(comid) {
    // 게시물 디테일 불러오기
    try {
      const response = await this.axios.get(`/detail/${comid}`, {
        
      });
      console.log(response)
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  async getMyCommunity(id) {
    try {
      const response = await this.axios.get(`/myCommunity/${id}`);
      console.log("api Response : ", response);
      return handleResponse(response);
    } catch (error) {
      console.log("api Response : ", error);
      handleError(error);
    }
  }


}

export default new CommunityApi();
