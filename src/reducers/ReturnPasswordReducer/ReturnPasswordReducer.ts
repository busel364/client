import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const defState: boolean = false;

const returnPasswordSlicer = createSlice({
    initialState: defState,
    name: 'returnPassword',
    reducers: {
        // setUserReturnPassword(state, action: PayloadAction<string | null>) {
        //     state.email = action.payload;
        // },
        setIsSuccess(state, action: PayloadAction<boolean>) {
            return action.payload;
        }
    }
})

export const { setIsSuccess } = returnPasswordSlicer.actions;
export default returnPasswordSlicer.reducer;


