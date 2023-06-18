import { createSlice} from "@reduxjs/toolkit";

const loc = localStorage.getItem('mode');
const defState = loc?JSON.parse(loc):true;

const modeSlice = createSlice({
    initialState: defState,
    name: 'mode',
    reducers: {
        changeMode(state) {
            localStorage.setItem('mode',JSON.stringify(!state));
            return !state;
        }
    }
})

export const { changeMode } = modeSlice.actions;
export default modeSlice.reducer;