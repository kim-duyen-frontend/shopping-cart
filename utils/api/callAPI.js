import axios from "axios";

export const myAPI = axios.create({
    baseURL: "http://localhost:5000"
})

export const getProductsPage = async (pageParam = 1) => {
    const response = await myAPI.get(`/products?page=${pageParam}`)
    return response.data
}