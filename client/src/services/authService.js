import axios from "axios";
import API_URL from "./apiConfig";
import authHeader from "./authHeader";

export const signIn = ({ email, password, isAutoLogin }) => {
  return axios
    .post(API_URL + "auth", { email, password, isAutoLogin })
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem(
          "Tokens",
          JSON.stringify({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          })
        );
      }
      return response.data;
    });
};
export const getAuth = async () => {
  try {
    const response = await axios.get(API_URL + "auth", {
      headers: authHeader(),
    });
    if (response.data.newAccessToken) {
      localStorage.setItem(
        "Tokens",
        JSON.stringify({
          accessToken: response.data.newAccessToken,
          refreshToken: response.data.refreshToken,
        })
      );
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // 401 오류 처리 로직 수정 필요
      throw new Error("Unauthorized"); // 예외를 발생시켜 로그아웃 처리를 유도
    } else {
      console.error("Error in getAuth", error);
      throw error;
    }
    // if (error.response && error.response.status === 401) {
    //   axios.get(API_URL + "auth", { headers: authHeader() });
    // } else {
    //   console.error("Error in getAuth", error);
    //   throw error;
    // }
  }
};

export const KakaoAuth = async (data) => {
  try {
    const response = await axios.post(API_URL + "auth/kakao", { data });
    if (response.status === 200) {
      localStorage.setItem(
        "Tokens",
        JSON.stringify({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })
      );
    }
    return response.data;
  } catch (error) {
    console.error("Error in getAuth", error);
    throw error;
  }
};

export const KakaoLogout = async () => {
  try {
    const response = await axios.post("https://kauth.kakao.com/oauth/logout");
    return response.data;
  } catch (error) {
    console.error("Error in getAuth", error);
    throw error;
  }
};

export const verityMail = async ({ email }) => {
  try {
    const response = await axios.post(API_URL + "auth/email", { email });
    return response.data;
  } catch (error) {
    console.error("Error in getAuth", error);
    throw error;
  }
};
export const verifyAuthNumber = async ({ email, code }) => {
  try {
    const response = await axios.post(API_URL + "auth/number", { email, code });
    return response.data;
  } catch (error) {
    console.error("Error in getAuth", error);
    throw error;
  }
};
