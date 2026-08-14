import axios from "axios";
import { baseUrl, login_api } from "../endpoints";
import { invProfile_api } from "../endpoints";
import { userProfile_api } from "../endpoints";



export function login(data){
    return axios.post(baseUrl+login_api,data)
}

export function invRegister(data) {
    return axios.post(baseUrl + invProfile_api, data);
}

export function userRegister(data) {
    return axios.post(baseUrl + userProfile_api, data);
}