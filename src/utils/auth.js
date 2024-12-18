export const getAccessToken = () => {
    return localStorage.getItem('atoken');
}

export const getRefreshToken = () => {
    return localStorage.getItem('rtoken');
}

export const setAccessToken = (token) => {
    localStorage.setItem('atoken', token);
}

export const setRefreshToken = (token) => {
    localStorage.setItem('rtoken', token);
}

export const clearTokens = () => {
    localStorage.removeItem('atoken');
    localStorage.removeItem('rtoken');
}
