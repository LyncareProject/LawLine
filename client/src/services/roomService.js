import axios from "axios";
import API_URL from "./apiConfig";

// Create ChatRoom
export const createRoom = ({ userId, title }) => {
  return axios.post(API_URL + "/room", { userId, title });
};

// Delete ChatRoom

// Update ChatRoom

// FindAll ChatRoom
export const findRoom = ({ userId }) => {
  return axios.get(API_URL + `/room/${userId}`);
};
// FindOne ChatRoom