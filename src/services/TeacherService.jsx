import axios from "axios"

export const getAllTeacher = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/teachers`)
        return res.data
    } catch (error) {
        console.log(error);
    }

}

export const getTeacher = async (id) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/teachers/${id}`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}
