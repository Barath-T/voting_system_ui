import axios from "axios";

const api_url = "http://192.168.0.103:3001/api/";

export const login = (id, password) => {
    return axios.post(api_url + "login", { id, password });
}

export const getVoted = () => {
    return axios.get(api_url + "votes/voted");
}
export const getCandidateStatus = () => {
    console.log("hello");
    return axios.get(api_url + "votes/candidates");
}