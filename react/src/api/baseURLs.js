// import axios from "axios";

// const BASE_URL = "http://localhost:8081/api/community";

// const fetchCommunityPosts = async (type, category) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/${type}/${category}`);
//     return response.data;
//   } catch (error) {
//     console.error("서버 오류:", error);
//     throw error;
//   }
// };

// export { BASE_URL, fetchCommunityPosts };


import axios from "axios";

const BASE_URL = "http://175.45.202.131:8081/api/community";

const fetchCommunityPosts = async (type, category) => {
  try {
    const response = await axios.get(`${BASE_URL}/${type}/${category}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      // 서버가 상태 코드로 응답했지만, 2xx 범위는 아닌 경우
      console.error("서버 응답 오류:", error.response.data);
    } else if (error.request) {
      // 요청이 만들어졌으나 응답을 받지 못한 경우
      console.error("서버로부터 응답을 받지 못함:", error.request);
    } else {
      // 요청을 설정하는 중에 오류가 발생한 경우
      console.error("요청 설정 오류:", error.message);
    }
    throw error;
  }
};


export { BASE_URL, fetchCommunityPosts };