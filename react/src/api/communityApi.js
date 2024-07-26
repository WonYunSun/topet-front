    import axios from "axios";
    import { handleResponse, handleError } from './ResponseProcess';

    const API_BASE_URL = 
    "http://175.45.202.131:8081/api";
    // "http://localhost:8081/api";

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
                const response = await axios.post(`${this.baseURL}/community/update/${(comid)}`, formData, {
                    headers: {
                        "Content-Type": "application/json",
                        credentials: 'include'
                    },
                    withCredentials: true // 세션 쿠키를 포함하도록 설정
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

        async postComment(comid, formData , crossOriginIsolated) { // 댓글 보내기
        try {
            const response = await axios.post(`${this.baseURL}/comment/post/f${comid}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    credentials: 'include'
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
            const response = await axios.post(`${this.baseURL}/commentUpdate`, formData, {
                //`${this.baseURL}/comment/update`
                headers: {
                    "Content-Type": "multipart/form-data",
                    credentials: 'include'
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
            const response = await axios.post(`${this.baseURL}/comment/delete/${commentid}`);
            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }

    async fetchComment(comid) { // 댓글 불러오기(답글 같이 불러와짐)
        try {
            const response = await axios.get(`${this.baseURL}/comment/${comid}`);
            //${this.baseURL}/comment//get/${comid}
            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }

    async postComment(comid, formData , crossOriginIsolated) { // 댓글 보내기
      try {
          const response = await axios.post(`${this.baseURL}/comment/post/${comid}`, formData, {
              headers: {
                  "Content-Type": "multipart/form-data",
                  credentials: 'include'
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
        const response = await axios.post(`${this.baseURL}/commentUpdate`, formData, {
            //`${this.baseURL}/comment/update`
            headers: {
            "Content-Type": "multipart/form-data",
            credentials: 'include'
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
            const response = await axios.post(`${this.baseURL}/commentUpdate`, formData, {
                //`${this.baseURL}/comment/update`
                headers: {
                    "Content-Type": "multipart/form-data",
                    credentials: 'include'
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
            const response = await axios.post(`${this.baseURL}/comment/delete/${replyId}`);
            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }
    

  async updateReply(formData) { // 답글 수정
    try {
        const response = await axios.post(`${this.baseURL}/commentUpdate`, formData, {
            //`${this.baseURL}/comment/update`
            headers: {
                "Content-Type": "multipart/form-data",
                credentials: 'include'
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
        const response = await axios.post(`${this.baseURL}/comment/delete/${replyId}`);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
}

async fetchlikedByCurrentUser(comid) {
    try{
        const response = await axios.get(`${this.baseURL}/like/detail/${comid}`)
        return handleResponse(response)
    } catch (error) {
        handleError(error);
    }
}
}

export default new CommunityApi(API_BASE_URL);
