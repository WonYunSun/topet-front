import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api";

class homeApi {
    constructor(baseURL) {
        this.client = axios.create({
            baseURL: baseURL,
        });
    }
    async getHomeData() {
        return await
            this.client.get("/home", {
                headers: {},  
                withCredentials: true,
            }).then((response) => {
                console.log("서버 응답:", response.data);
                return response.data;
            }).catch((error) => {
                console.error("서버 오류:", error);
                throw error;
            });
        }
    }
export default new homeApi(API_BASE_URL);
