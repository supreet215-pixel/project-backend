import axios from "axios";
import { baseUrl,AddCategory_api } from "../endpoints";

function getToken() {
    const token = sessionStorage.getItem("token");

    const head = {
      Authorization: token,
    };

    return { headers: head };
  }



export function addCategory(data) {
    return axios.post(baseUrl + AddCategory_api, data,getToken());
}
  