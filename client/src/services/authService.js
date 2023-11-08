import axios from 'axios';
import API_URL from './apiConfig';
import { authRefreshHeader, authAccessHeader } from './authHeader';

export const signin = ({ email, password, autoLogin }) => {
    return axios.post(API_URL + 'auth', { email, password, autoLogin })
        .then((response) => {
            if (response.status === 200){
                localStorage.setItem('Tokens', JSON.stringify({
                    'accessToken': response.data.accessToken,
                    'refreshToken': response.data.refreshToken
                }))
            }
            return response.data;
        });
};
export const getAuth = async () => {
    try {
        const response = await axios.get(API_URL + "auth", { headers: authAccessHeader()})
        // console.log(response)
        // if (response.data.newAccessToken){
        //     localStorage.setItem('Tokens', JSON.stringify({
        //         'accessToken': response.data.newAccessToken,
        //         'refreshToken': response.data.refreshToken
        //     }))
        // }
        return response.data;
    } catch(error){
        if (error.response && error.response.status === 401) {
            axios.get(API_URL + "auth", { headers: authRefreshHeader()})
        } else {
            console.error('Error in getAuth', error);
            throw error;
        }
    }
};
export const getUser = () => {
    return axios.get(API_URL + "auth/user", { headers: authAccessHeader() })
        .then((response) => {
            if (response.data.newAccessToken){
                localStorage.setItem('Tokens', JSON.stringify({
                    'accessToken': response.data.newAccessToken,
                    'refreshToken': response.data.refreshToken
                }))
            }
            return response.data;
        });
};
