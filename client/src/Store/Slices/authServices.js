import axios from 'axios';

const api = 'https://mern-notes-app-wbp8.onrender.com';


const login = async (userData) => {

    const response = await axios.post(`${api}/auth/login`, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data
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