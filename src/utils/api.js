import axios from "axios";

const api = axios.create({
    baseURL: '/api/shop',
    timeout: 5 * 1000
})

export default api;