import axios from "axios";
import { updateCommunityPosts } from "../redux/reducers/communityPosts";

const DOG_API_BASE_URL = "http://localhost:5001";
const CAT_API_BASE_URL = "http://localhost:5002";
const EXOTICPET_API_BASE_URL = "http://localhost:5003";

const baseURLs = {
  dog: DOG_API_BASE_URL,
  cat: CAT_API_BASE_URL,
  exoticpet: EXOTICPET_API_BASE_URL
};

const fetchCommunityPosts = (type, category) => async (dispatch) => {
  try {
    const response = await axios.get(`${baseURLs[type]}/${category}`);
    dispatch(updateCommunityPosts({ category: `${type}_community_${category}`, data: response.data }));
  } catch (error) {
    console.error("서버 오류:", error);
  }
};

export { baseURLs, fetchCommunityPosts };
