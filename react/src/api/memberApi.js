import createAxios from "./createAxios";

const MID_URL = "/pet";

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
    
    logout() {
        console.log("로그아웃 로직 처리하기 시작");
        try {
        this.client
            .post(
            "/member/logout",
            {},
            {
                headers: {
                "Content-Type": "application/json",
                },
                withCredentials: true,
            }
            )
            .then((response) => {
            if (response.data === "success") {
                window.location.href = "/";
            } else {
                window.location.href = "／myPage";
            }
            });
        } catch {
        console.log("로그아웃실패");
        }
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
    
    
    
    async postMemberInfo(formData) {
        try {
        const response = await this.client.post(
            "/member/userregister",
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
        await this.client.get("/member/getMyPage");
        
        
        }catch(error){
        throw error;
        }
    }
    
}
export default new memberApi();

