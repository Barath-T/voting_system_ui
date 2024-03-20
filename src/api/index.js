import axios from "axios";

const api_url = "http://172.20.10.3:3001/api/";

export const login = (id, password) => {
  return axios.post(api_url + "login", { id, password });
}

export const getVoted = () => {
  return axios.get(api_url + "votes/voted");
}
export const getCandidateStatus = () => {
  return axios.get(api_url + "votes/candidates");
}
export const restartElection = () => {
  return axios.post(api_url + "votes/restart");
}
export const endElection = () => {
  return axios.post(api_url + "votes/end");
}
