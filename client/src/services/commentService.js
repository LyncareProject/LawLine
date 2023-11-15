import axios from "axios";
import API_URL from "./apiConfig";

export const createAIComment = ({ content, counselId }) => {
  return axios.post(API_URL + "comment/ai", {
    content,
    counselId,
  });
};
export const createComment = ({
  name,
  content,
  userId,
  userRole,
  counselId,
}) => {
  return axios.post(API_URL + "comment", {
    name,
    content,
    userId,
    userRole,
    counselId,
  });
};
export const findAllComment = () => {
  return axios.get(API_URL + "comment");
};

export const readComment = ({ commentId }) => {
  return axios.get(API_URL + `comment/${commentId}`);
};

export const updateComment = ({
  commentId,
  name,
  content,
  userId,
  userRole,
  counselId,
}) => {
  return axios.put(API_URL + `comment/${commentId}`, {
    name,
    content,
    userId,
    userRole,
    counselId,
  });
};
export const deleteComment = ({ commentId }) => {
  return axios.delete(API_URL + `comment/${commentId}`);
};
