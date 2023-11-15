import axios from 'axios';

const instance = axios.create({
    // baseURL: "https://ratemyjunglerbackend.onrender.com"
    baseURL: 'http://localhost:3001'
})

export { instance };