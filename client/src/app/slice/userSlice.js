import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentUser: false,
    error: false,
    loading: false
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.error = null
            state.loading = true

        },
        signInSucess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },

        signInFaliure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updateStart: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        updateSucess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null
        },
        updateFaliure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        deleteUserStart: (state, action) => {
            state.loading = true
            state.error = null
        },
        deleteUserSucess: (state, action) => {
            state.currentUser = null,
                state.loading = false,
                state.error = false
        },
        deleteUserFaliure: (state, action) => {
            state.error = action.payload
        },
        signOutUserSucess:(state,action)=>{
            state.error=false,
            state.loading=false,
            state.currentUser=null
        },
    }
})

export const { signInStart,
    signInSucess,
    signInFaliure,
    updateStart,
    updateSucess,
    updateFaliure,
    deleteUserStart,
    deleteUserSucess,
    deleteUserFaliure,
    signOutUserSucess
} = userSlice.actions
export default userSlice.reducer