import axios from "axios";
import API_URL from "./apiConfig";

// Create Chat
export const createChat = ({ roomId, role, content }) => {
  return axios.post(API_URL + "/chat", { roomId, role, content });
};

// Delete Chat

// Update Chat

// FindAll Chat
// FindOne Chat