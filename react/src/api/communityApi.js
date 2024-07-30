import axios from "axios";
import { handleResponse, handleError } from './ResponseProcess';

const API_BASE_URL = 
"http://localhost:8081/api";// "http://localhost:8081/api";

class CommunityApi {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async postCommunity(selectedPhotos, formData) { // 게시물 작성
        selectedPhotos.slice(0, 5).forEach((photo, index) => {
            formData.append("photos", photo);
        });

        try {
            const response = await axios.post(`${this.baseURL}/community/post`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            console.log(response);
            return handleResponse(response);
        } catch (error) {
            console.log(error);
            handleError(error);
        }
    }

    async editCommunity(selectedPhotos, formData, comid) { // 게시물 수정
        selectedPhotos.slice(0, 5).forEach((photo, index) => {
            formData.append("photos", photo);
        });

        try {
            const response = await axios.post(`${this.baseURL}/community/update/${comid}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, // 세션 쿠키를 포함하도록 설정
            });
            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }

    async deleteCommunity(comid) { // 게시물 삭제
        try {
            const response = await axios.post(`${this.baseURL}/community/delete/${comid}`, {}, {
                withCredentials: true,
            });
            return handleResponse(response);    
        } catch (error) {
            handleError(error);
        }
    }

    async fetchCommunityPosts (type, category, page, size) { // 게시물 리스트 불러오기(+무한스크롤)
    try {
        const response = await axios.get(`${API_BASE_URL}/community/${type}/${category}?page=${size}&size=${page}` , {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("서버 오류:", error);
        throw error;
    }
    };

    async fetchCommunityDetail(comid) { // 게시물 디테일 불러오기
        try {
            const response = await axios.get(`${this.baseURL}/community/detail/${comid}`, {
                withCredentials: true,
            });
            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }

    async postComment(comid, formData) { // 댓글 보내기
        try {
            const response = await axios.post(`${this.baseURL}/comment/post/${comid}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }

    async updateComment(formData) { // 댓글 수정
        try {
            const response = await axios.post(`${this.baseURL}/comment/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }

    async deleteComment(commentid) { // 댓글 삭제
        try {
            const response = await axios.post(`${this.baseURL}/comment/delete/${commentid}`, {}, {
                withCredentials: true,
            });
            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }

    async fetchComment(comid) { // 댓글 불러오기(답글 같이 불러와짐)
        try {
            const response = await axios.get(`${this.baseURL}/comment/get/${comid} `, {
                withCredentials: true,
            });
            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }

    async postReplyComment(comid, formData) { // 답글 작성
        try {
            const response = await axios.post(`${this.baseURL}/comment/post/${comid}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }

    async updateReply(formData) { // 답글 수정
        try {
            const response = await axios.post(`${this.baseURL}/comment/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }

    async deleteReply(replyId) { // 답글 삭제
        try {
            const response = await axios.post(`${this.baseURL}/comment/delete/${replyId}`, {}, {
                withCredentials: true,
            });
            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }

    async fetchLikedByCurrentUser(comid) { // 게시물 디테일 좋아요 여부 불러오기
        try {
            const response = await axios.get(`${this.baseURL}/like/detail/${comid}`, {
                withCredentials: true,
            });
            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }

    async postLike(comid) {
        try {
            const response = await axios.post(`${this.baseURL}/like/${comid}`, {}, {
                withCredentials: true,
            });
            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }
}

export default new CommunityApi(API_BASE_URL);
