import axios from "axios";

export const myAPI = axios.create({
    baseURL: "http://localhost:5000"
})

