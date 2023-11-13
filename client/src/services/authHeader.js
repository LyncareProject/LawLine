export default function authHeader() {
    const Tokens = JSON.parse(localStorage.getItem('Tokens'));
    if (Tokens) {
        // console.log(Tokens)
        return {     
            "refresh": Tokens.refreshToken,
            'x-access-token': Tokens.accessToken 
        };
    } else {
        return {};
    }
}