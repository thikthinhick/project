export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}
export const setUserSession = (token) => {
    sessionStorage.setItem('token', token);
}
export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    setTimeout(() => {
        window.location = 'http://localhost:3000/home'
    }, 500)
    
}