import createAxios from "./createAxios";

const MID_URL = "/shorts";


class shortsApi {

constructor() {
    this.axios = createAxios(MID_URL);
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

}
export default new shortsApi();

