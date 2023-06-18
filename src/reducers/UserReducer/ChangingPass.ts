import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const defState = false;

const passwordChangeSlice = createSlice({
    initialState: defState,
    name:'allowedForbidden',
    reducers:{
        changeAccess(state, action:PayloadAction<boolean>){
            return action.payload;
        }
    }
})

export const {changeAccess} = passwordChangeSlice.actions;
export default passwordChangeSlice.reducer;