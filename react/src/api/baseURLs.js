// import axios from "axios";

// const DOG_API_BASE_URL = "http://localhost:5001";
// const CAT_API_BASE_URL = "http://localhost:5002";
// const EXOTICPET_API_BASE_URL = "http://localhost:5003";

// const baseURLs = {
//   dog: DOG_API_BASE_URL,
//   cat: CAT_API_BASE_URL,
//   exoticpet: EXOTICPET_API_BASE_URL
// };

// const fetchCommunityPosts = async (type, category) => {
//   try {
//     const response = await axios.get(`${baseURLs[type]}/${category}`);
//     return response.data; // 데이터를 반환
//   } catch (error) {
//     console.error("서버 오류:", error);
//     throw error; // 오류를 던짐
//   }
// };

// export { baseURLs, fetchCommunityPosts };


import axios from "axios";

const DOG_API_BASE_URL = "http://localhost:5001";
const CAT_API_BASE_URL = "http://localhost:5002";
const EXOTICPET_API_BASE_URL = "http://localhost:5003";

const baseURLs = {
  dog: DOG_API_BASE_URL,
  cat: CAT_API_BASE_URL,
  exoticpet: EXOTICPET_API_BASE_URL
};

const fetchCommunityPosts = async (type, category, limit, start) => {
  try {
    const response = await axios.get(`${baseURLs[type]}/${category}?_limit=${limit}&_start=${start}`);
    return response.data;
  } catch (error) {
    console.error("서버 오류:", error);
    throw error;
  }
};

export { baseURLs, fetchCommunityPosts };

