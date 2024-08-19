import createAxios from "./createAxios";

const MID_URL = "/shorts";

class shortsApi {
  constructor() {
    this.axios = createAxios(MID_URL);
  }

  async getAllShorts(page, size){
      try{
          const response  = await this.axios.get(`/getAll?page=${page}&size=${size}`);
          console.log("서버 응답:", response); // 응답 데이터 출력
        return response.data; // 응답 데이터 반환 (필요 시)
      }catch(error){
        console.error("서버 오류:", error);
        throw error; // 오류 처리
      }
  }

  async postShorts(formData) {
    return await this.axios
    .post("/post", formData, {
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

  async getShortsDetail(id){
    try{
      const response  = await this.axios.get(`/detail/${id}`);
      
    return response.data; // 응답 데이터 반환 (필요 시)
  }catch(error){
    console.error("서버 오류:", error);
    throw error; // 오류 처리
  }


  }
  async getRandomShorts(){
    try{
      const response = await this.axios.get('/random');
      
      return response.data; // 응답 데이터 반환 (필요 시)
    } catch(error){
      console.error("서버 오류:", error); 
      throw error; // 오류 처리
  }
  }

  async getMyShorts(id){
    try{
      const response = await this.axios.get(`/myshorts/${id}`);
      console.log(response);
      return response.data;
    }catch(error){
      console.log("오류", error)
      throw error;
    }
  }

  async getFileShorts(){
    try{
      const response = await this.axios.get('/fiveShorts');
      console.log(response);
      return response.data;
    }catch(error){
      console.log(error);
      throw error;
    }
  }

}
export default new shortsApi();

