import { createSlice } from "@reduxjs/toolkit";
const initialState={
    currentUser:false,
    error:false,
    loading:false
}
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.error=null
            state.loading=true

        },
        signInSucess:(state,action)=>{
            state.currentUser=action.payload
            state.loading=false
            state.error=null
        },

        signInFaliure:(state,action)=>{
            state.loading=false
            state.error=action.payload
        },
    }
})

export const { signInStart, signInSucess, signInFaliure } = userSlice.actions
export default userSlice.reducer