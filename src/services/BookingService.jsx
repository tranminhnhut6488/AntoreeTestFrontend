import axios from "axios"

export const handleBooking = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/bookings`, data);
        return res.data
    } catch (error) {
        console.error(error);
    }
}

export const bookingPackage = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/packages/buy`, data);
        return res.data
    } catch (error) {
        console.error(error);
    }
}
export const getPackage = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/packages`);
        return res.data
    } catch (error) {
        console.error(error);
    }
}

export const getBooking = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/bookings`);
        return res.data
    } catch (error) {
        console.error(error);
    }
}
export const paidLesson = async (id) => {
    try {
        const res = await axios.patch(`${process.env.REACT_APP_API_URL}/packages/${id}/pay`);
        return res.data
    } catch (error) {
        console.error(error);
    }
}