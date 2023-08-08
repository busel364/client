import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const defState: {
    [key: string]: boolean,
    'login': boolean,
    'register': boolean,
    'returnPass': boolean
} = {
    login: false,
    register: false,
    returnPass: false
}

const errorSlicer = createSlice({
    initialState: defState,
    name: 'errors',
    reducers: {
        setError(state, action: PayloadAction<string>) {
            state[action.payload] = true;
        },
        removeError(state, action: PayloadAction<string>) {
            state[action.payload] = false;
        }
    }
})

export const { removeError, setError } = errorSlicer.actions;
export default errorSlicer.reducer;