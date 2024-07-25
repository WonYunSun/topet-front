import axios from "axios";
import { handleResponse, handleError } from './ResponseProcess';

const API_BASE_URL =
  "http://localhost:8081/api";
// "http://175.45.202.131:8081/api";
class homeApi {
    constructor(baseURL) {
        this.baseURL = baseURL; 
        this.client = axios.create({
            baseURL:this.baseURL
        });
    }
    async getHomeDataMember() {
        try {
            const response = await this.client.get("/member/home", {
                withCredentials: true,
            });
            console.log("서버 응답:", response.data); // 응답 데이터 출력
            return response.data; // 응답 데이터 반환 (필요 시)
        } catch (error) {
            console.error("서버 오류:", error);
            throw error; // 오류 처리
        }
    }

    async getHomeDataSchedule() {
        try {
            const response = await this.client.get("/schedule/home", {
                withCredentials: true,
            });
            console.log("서버 응답:", response.data); // 응답 데이터 출력
            return response.data; // 응답 데이터 반환 (필요 시)
        } catch (error) {
            console.error("서버 오류:", error);
            throw error; // 오류 처리
        }
    }

    // async getHomeDataPet(){
    //     try {
    //         const response = await this.client.get("/home_pet", {
    //             withCredentials: true,
    //         });
    //         console.log("서버 응답:", response.data); // 응답 데이터 출력
    //         return response.data; // 응답 데이터 반환 (필요 시)
    //     } catch (error) {
    //         console.error("서버 오류:", error);
    //         throw error; // 오류 처리
    //     }
    // }


}
export default new homeApi(API_BASE_URL);
