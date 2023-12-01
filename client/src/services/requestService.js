import axios from "axios";
import API_URL from "./apiConfig";

export const requestLawyerCounsel = ({ userId, counselId }) => {
  return axios.post(API_URL + "/request", { userId, counselId });
};
