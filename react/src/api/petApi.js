import createAxios from "./createAxios";
import { handleResponse } from "./ResponseProcess";
import { handleError } from "./ResponseProcess";
const MID_URL = "/pet";

class petApi {
  constructor() {
    this.axios = createAxios(MID_URL);
  }

  async getMyPet(id){

    try{
      const response = await this.axios.get(`/petProfileDetail/${id}`)
      console.log(response);
      return response.data;
    }catch(error){
      console.error("서버 오류:", error);
      throw error;
    }
  }
    
    
    
    

  async getMyPets(id){

    try{
      const response = await this.axios.get(`/getMyPets/${id}`);
      return handleResponse(response);
    }catch(error){
      return handleError(error);
    }
  }
  
  async postPetData(petDomain) {
    return await this.axios.post("/post", petDomain, {
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

  async postAddPet(petCode) {
    return await this.axios
      .post("/postAddPet", {uid :petCode}, {
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

  async deleteMember(formData){
    try{  
      const response = await this.axios.post(`/deleteMember`,formData,{ 
        headers: {
        "Content-Type": "application/json"
        }
      })
      ;
      return response;
    }catch(error){

    }
  }

  async updatePet(formData){
    try{
      const response = await this.axios.patch("/update", formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
     return response.data; 
    }catch(error){
      throw error;
    }
  }

  async deletePet(memberId, petId){
    try{
      const response = await this.axios.post(`/deletePet/${memberId}/${petId}`);
      console.log(response);
      return response.data;
    }catch(error){
      throw error;
    }
  }
  
}
export default new petApi();

