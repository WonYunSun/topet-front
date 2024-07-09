import axios from "axios";
import { updateCommunityPosts } from "../redux/reducers/communityPosts";

const API_BASE_URL = "http://175.45.202.131:8081/api";

//이거는 테스트용 json-server 주소 나중에 지울거임
const DOG_API_BASE_URL = "http://localhost:5001";
const CAT_API_BASE_URL = "http://localhost:5002";
const EXOTICPET_API_BASE_URL = "http://localhost:5003";

const baseURLs = {
  dog: DOG_API_BASE_URL,
  cat: CAT_API_BASE_URL,
  exoticpet: EXOTICPET_API_BASE_URL
};
//

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
  
      const hashtagsString = selectedTags
        .map((tag, index) => `${index + 1},${tag}`)
        .join("");
      formData.append("hashtag", hashtagsString);
  
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

    fetchCommunityPosts = (type, category) => async (dispatch) => { //json-server 주소로 되어 있음. 나중에 실 주소로 바꿔야 함.
        try {
          const response = await axios.get(`${this.baseURLs[type]}/${category}`);
          dispatch(updateCommunityPosts({ category: `${type}_community_${category}`, data: response.data }));
        } catch (error) {
          console.error("서버 오류:", error);
        }
      };
  }
  
  export default new CommunityApi(API_BASE_URL);