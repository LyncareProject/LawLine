import axios from 'axios';
import API_URL from './apiConfig';
import authHeader from './authHeader';

export const signIn = ({ email, password, isAutoLogin }) => {
    return axios.post(API_URL + 'auth', { email, password, isAutoLogin })
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
        const response = await axios.get(API_URL + "auth", { headers: authHeader()})
        if (response.data.newAccessToken){
            localStorage.setItem('Tokens', JSON.stringify({
                'accessToken': response.data.newAccessToken,
                'refreshToken': response.data.refreshToken
            }))
        }
        return response.data;
    } catch(error){
        if (error.response && error.response.status === 401) {
            axios.get(API_URL + "auth", { headers: authHeader()})
        } else {
            console.error('Error in getAuth', error);
            throw error;
        }
    }
};
