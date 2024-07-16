import axios from "axios";

//const API_BASE_URL = "http://175.45.202.131:8081/api";
const API_BASE_URL = "http://localhost:8081/api";

class CommunityApi {

    constructor(baseURL) {
      this.baseURL = baseURL;
    }
  
    async postCommunity(selectedPhotos, formData) { //게시물 작성시 사진 전송
      
  
      selectedPhotos.slice(0, 10).forEach((photo, index) => {
        formData.append("photos", photo);
      });
  
      return  await axios
        //.post(`${this.baseURL}/community/communityPost`, formData, {
        .post(`/api/community/communityPost`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            credentials: 'include'
          },
        })
        .then((response) => {
          console.log("서버 응답:", response.data);
          return response.data;
        })
        .catch((error) => {
          console.error("서버 오류:", error);
          throw error;
        });
    }
  
    async fetchCommunityDetail(comid) {
      return await axios
        .get(`http://localhost:5004/detail?comid=${comid}`)
        .then((response) => {
          console.log("서버 응답:", response.data);
          return response.data;
        })
        .catch((error) => {
          console.error("서버 오류:", error);
          throw error;
        });
    }  }
  
  export default new CommunityApi(API_BASE_URL);