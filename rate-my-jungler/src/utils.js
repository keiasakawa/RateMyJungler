import axios from 'axios';

const instance = axios.create({
    baseURL: "https://ratemyjunglerbackend.onrender.com"
})

export { instance };