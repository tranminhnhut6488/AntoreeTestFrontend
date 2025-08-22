import axios from "axios"

export const loginUser = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, data)
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const registerUser = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, data)
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const getDetailUser = async (id) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}