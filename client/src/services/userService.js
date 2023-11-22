import axios from 'axios';
import API_URL from './apiConfig';

export const createUser = ({ email, username, password, phone, callNumber, registNumber}) => {
    return axios.post(API_URL + 'user', { email, username, password, phone, callNumber, registNumber });
};

export const findUser = ({ id }) => {
    return axios.get(API_URL + `user/${id}`);
};
export const updateUser = ({ id, phone }) => {
    return axios.put(API_URL + `user/${id}`, {phone});
};
export const deleteUser = (id) => {
    return axios.delete(API_URL + `user/${id}`);
};