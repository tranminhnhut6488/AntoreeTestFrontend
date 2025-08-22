import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    role: ''
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name, email, role } = action.payload
            state.name = name;
            state.email = email;
            state.role = role;
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.role = '';
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = UserSlice.actions

export default UserSlice.reducer