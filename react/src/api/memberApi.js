import createAxios from "./createAxios";

const MID_URL = "/member";

class memberApi {

constructor() {
    this.axios = createAxios(MID_URL);
}

    async getMyPet(id){
        return await
        this.axios.get(`/getMyPet/${id}`, {
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

    async postPetData(petDomain) {
        return await this.axios
        .post("/post", petDomain, {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => {
            console.log("서버 응답:", response);
            return response;
        })
        .catch((error) => {
            console.error("서버 오류:", error);
            throw error;
        });
    }

    async getHomeDataMember() {
        try {
            const response = await this.axios.get("/home", {});
            console.log("서버 응답:", response); // 응답 데이터 출력
            return response; // 응답 데이터 반환 (필요 시)
        } catch (error) {
            console.error("서버 오류:", error);
            throw error; // 오류 처리
        }
    }
    
    async kakaoLogin(){
        try{
            const response = await this.axios.get(
            // 'http://175.45.202.131:8081/api/member/kakaoLogin',
            "/kakaoLogin",
            {
                withCredentials: true,
            }
            );
            console.log(response);
            return response.data;
        }catch(error){
            throw error;
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
    
    async logout() {
        console.log("로그아웃 로직 처리하기 시작");
        try {
            const response = await this.axios.post("/logout");
            console.log(response);
            return response;
        }catch {
            console.log("로그아웃실패");
        }
    }

    
    
    async memberUpdate(formData) {
        try {
        const response = await this.axios.patch(
            "/update",
            formData,
            {
            headers: {
                "Content-Type": "multipart/form-data",
            },    
            withCredentials: true,
            }
        );
        console.log("서버 응답:", response); // 응답 데이터 출력
        return response; // 응답 데이터 반환 (필요 시)
        } catch (error) {
        console.error("서버 오류:", error);
        throw error; // 오류 처리
        }
    }
    
    async getMypage(){
        try{
        await this.client.get("/getMyPage");
        
        
        }catch(error){
        throw error;
        }
    }
    
}
export default new memberApi();