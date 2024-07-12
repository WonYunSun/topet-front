import axios from "axios";

const API_BASE_URL = "http://175.45.202.131:8081/api";


class CommunityApi {
    constructor(baseURL) {
      this.baseURL = baseURL;
    }
  
    async postServerWithPhotos(selectedPhotos) { //게시물 작성시 사진 전송
      const formData = new FormData();
  
      selectedPhotos.slice(0, 10).forEach((photo, index) => {
        formData.append("photos", photo);
      });
  
      return  await axios
        .post(`${this.baseURL}/community/community/postPhoto`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
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
  
    async postServerWithoutPhotos(titleText, contentText, selectedTags) { //게시물 작성시 제목, 본문, 해시태그 전송
      const formData = new FormData();
  
      formData.append("title", titleText);
      formData.append("content", contentText);

      if (selectedTags.length > 0) {
        // 첫 번째 요소는 'category'로 추가
        formData.append('category', selectedTags[0]);
  
        // 나머지 요소들을 'hashtag' 문자열로 결합하여 추가
        const hashtagsString = selectedTags.slice(1).map((tag, index) => `${index + 1},${tag}`).join('');
        formData.append('hashtag', hashtagsString);
      }
  
  
  
      return await axios
        .post(`${this.baseURL}/community/community/post`, formData, {
          headers: {
            "Content-Type": "application/json",
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
    }


    

  }
  
  export default new CommunityApi(API_BASE_URL);