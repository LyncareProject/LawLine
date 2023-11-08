export const authRefreshHeader = () => {
    const Tokens = JSON.parse(localStorage.getItem('Tokens'));
    if (Tokens) {
        return {     
            "refresh": Tokens.refreshToken
        };
    } else {
        return {};
    }
}
export const authAccessHeader = () => {
    const Tokens = JSON.parse(localStorage.getItem('Tokens'));
    if (Tokens) {
        return {     
            'x-access-token': Tokens.accessToken 
        };
    } else {
        return {};
    }
}
// export default function authHeader() {
//     const Tokens = JSON.parse(localStorage.getItem('Tokens'));
//     if (Tokens) {
//         return {     
//             "refresh": Tokens.refreshToken,
//             'x-access-token': Tokens.accessToken 
//         };
//     } else {
//         return {};
//     }
// }