import axios from "axios";
import API_URL from "./apiConfig";

export const forwardPath = ({ path }) => {
  return axios.get(API_URL + `forward/${path}`);
};

