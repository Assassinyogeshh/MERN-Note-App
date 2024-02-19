import axios from 'axios';

const api = 'http://localhost:3000';

const login = async (userData) => {

    const response = await axios.post(`${api}/auth/login`, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }


    return response.data;
}

const register = async (userData) => {
    const response = await axios.post(`${api}/auth/register`, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data
}

const logout = async () => {
   localStorage.removeItem('user');
}

const authServices = {
    register,
    login,
    logout
}

export default authServices;