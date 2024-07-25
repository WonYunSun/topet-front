import axios from "axios";

const API_BASE_URL = 
"http://localhost:8081/api";
//"http://175.45.202.131:8081/api";
class petRegistApi {
    constructor(baseURL) {
        this.client = axios.create({
        baseURL: baseURL,
        });
    }


    async postPetData(petDomain) {
        return await
            this.client.post("/petRegistration", petDomain, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },  
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
export default new petRegistApi(API_BASE_URL);
