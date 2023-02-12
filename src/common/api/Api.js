import axios from "axios"

const api = axios.create({
    baseURL: "https://curiousnerd-backend-gfyo.onrender.com/",
    // baseURL: "http://localhost:5000//",
})

export default api;