import axios from "axios";
import API_URL from "./apiConfig";

export const createCounsel = ({
  title,
  name,
  phone,
  password,
  userId,
  desc,
}) => {
  return axios.post(API_URL + "counsel", {
    title,
    name,
    phone,
    password,
    userId,
    desc,
  });
};

export const findAllCounsel = () => {
  return axios.get(API_URL + "counsel");
};

export const readCounsel = ({ counselId }) => {
  return axios.get(API_URL + `counsel/${counselId}`);
};

export const searchCounsel = ({ phone, password }) => {
  return axios.post(API_URL + `counsel/search`, { phone, password });
};

export const updateCounsel = ({
  counselId,
  title,
  name,
  phone,
  password,
  desc,
}) => {
  return axios.put(API_URL + `counsel/${counselId}`, {
    title,
    name,
    phone,
    password,
    desc,
  });
};

export const deleteCounsel = ({ counselId }) => {
  return axios.delete(API_URL + `counsel/${counselId}`);
};

export const findUserCounsel = ({ userId }) => {
  return axios.get(API_URL + `counsel/user/${userId}`);
};

