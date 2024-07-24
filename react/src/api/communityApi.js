import axios from "axios";
import { handleResponse, handleError } from './ResponseProcess';

const API_BASE_URL = 
//"http://175.45.202.131:8081/api";
"http://localhost:8081/api";

class CommunityApi {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async postCommunity(selectedPhotos, formData) { // 게시물 보내기
        selectedPhotos.slice(0, 5).forEach((photo, index) => {
            formData.append("photos", photo);
        });

        try {
            const response = await axios.post(`${this.baseURL}/community/communityPost`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            console.log(response);
            //return handleResponse(response);
        } catch (error) {
            console.log(error);
            //handleError(error);
        }
    }

    async editCommunity(selectedPhotos, formData, comid) { // 게시물 수정
        selectedPhotos.slice(0, 5).forEach((photo, index) => {
            formData.append("photos", photo);
        });

        try {
            const response = await axios.post(`${this.baseURL}/community/update/${(comid)}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    credentials: 'include'
                },
            });
            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }

    async deleteCommunity(comid) { // 게시물 삭제
        try {
            const response = await axios.post(`${this.baseURL}/community/delete/${comid}`);
            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }

    async fetchCommunityPosts(type, category) { //게시물 리스트 불러오기
      try {
          const response = await axios.get(`${this.baseURL}/community/${type}/${category}`);
          return handleResponse(response);
      } catch (error) {
          handleError(error);
      }
  }

    async fetchCommunityDetail(comid) { //게시물 디테일 불러오기
        try {
            const response = await axios.get(`${this.baseURL}/community/detail/${comid}`);
            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }

    async postComment(comid, formData) { // 댓글 보내기
      try {
          const response = await axios.post(`${this.baseURL}/${comid}/comentPost`, formData, {
              headers: {
                  "Content-Type": "multipart/form-data",
                  credentials: 'include'
              },
          });
          return handleResponse(response);
      } catch (error) {
          handleError(error);
      }
  }

  async fetchComment(comid) { // 댓글 불러오기
    try {
        const response = await axios.get(`${this.baseURL}/comment/${comid}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
  }
}

export default new CommunityApi(API_BASE_URL);
