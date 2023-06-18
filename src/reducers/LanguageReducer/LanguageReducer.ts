import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const defState = 'he';

const lanuageSlice = createSlice({
    initialState: defState,
    name: 'language',
    reducers: {
        changeLanguage(state, action: PayloadAction<'en' | 'ru' | 'he'>) {
            return action.payload;
        }
    }
})

export const { changeLanguage } = lanuageSlice.actions;
export default lanuageSlice.reducer;