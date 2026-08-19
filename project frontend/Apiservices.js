import axios from "axios";

const baseUrl = "http://localhost:3000/apis/";
const user = "http://localhost:3000/user/";
const investor = "http://localhost:3000/investor/";

class Apiservices {
  getToken() {
    const token = sessionStorage.getItem("token");

    const head = {
      Authorization: token,
    };

    return { headers: head };
  }

  // login(data) {
  //   return axios.post(baseUrl + "users/login", data);
  // }

  // InvRegister(data) {
  //   return axios.post(baseUrl + "InvProfile/register", data);
  // }
  // UserRegister(data) {
  //   return axios.post(baseUrl + "UserProfile/register", data);
  // }
  //////////////////////////////////////////ADMIN PANEL/////////////////////////////////////////////////////////
  AddCategory(data) {
    return axios.post(baseUrl + "Category/add", data, this.getToken());
  }
  ManageCategory(data) {
    return axios.post(baseUrl + "Category/all", data, this.getToken());
  }
  DeleteCategory(data) {
    return axios.post(baseUrl + "Category/DeleteOne", data, this.getToken());
  }
  SoftDeleteCategory(data) {
    return axios.post(baseUrl + "Category/softDelete", data, this.getToken());
  }
  GetSingleCate(data) {
    return axios.post(baseUrl + "Category/single", data, this.getToken());
  }
  UpdateCategory(data) {
    return axios.post(
      baseUrl + "Category/UpdateCategory",
      data,
      this.getToken(),
    );
  }
  ///////////////////////////////////////////USER PANEL///////////////////////////////////////////////////////////
  AddPitch(data) {
    return axios.post(user + "Pitch/add", data, this.getToken());
  }
  allCategory(data) {
    return axios.post(user + "Category/all", data, this.getToken());
  }
  ManagePitch(data) {
    return axios.post(user + "Pitch/all", data, this.getToken());
  }
  DeletePitch(data) {
    return axios.post(user + "Pitch/DeleteOne", data, this.getToken());
  }
  SoftDeletePitch(data) {
    return axios.post(user + "Pitch/softDelete", data, this.getToken());
  }
  GetSinglePitch(data) {
    return axios.post(user + "Pitch/single", data, this.getToken());
  }
  ////////////////////////////////////////INVESTOR PANEL////////////////////////////////////////
  AllPitch(data) {
    return axios.post(investor + "Pitch/all", data, this.getToken());
  }
  GetPitch(data) {
    return axios.post(investor + "Pitch/single", data, this.getToken());
  }
//////////////////////////////////////////AI CALL/////////////////////////////////////
  getSuggestion(data){
    return axios.post(investor+"getSuggestion",data,this.getToken())
  }

}
export default new Apiservices();
