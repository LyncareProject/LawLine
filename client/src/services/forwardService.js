import axios from "axios";
import API_URL from "./apiConfig";

// export const forwardPath = ({ path }) => {
//   const pathToken = localStorage.getItem('pathToken');
//   console.log('pathToken', pathToken)
//   return axios.get(API_URL + `forward/${path}`, {
//     headers: {
//       'pathtoken': `Bearer ${pathToken}`
//     }
//   });
// };

export const forwardPath = ({ path }) => {
  return axios.get(API_URL + `forward/${path}`);
};

