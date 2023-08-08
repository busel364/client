import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { News } from "../../utils/types/NewsTypes";

const defState: {
    selectedNew: News | null,
    news: News[]
} = {
    selectedNew: null,
    news: [] as News[]
};

const newsSlice = createSlice({
    initialState: defState,
    name: 'news',
    reducers: {
        setNew(state, action: PayloadAction<News>) {
            state.selectedNew = action.payload;
        },
        removeNew(state) {
            state.selectedNew = null;
        },
        setNews(state, action: PayloadAction<News[]>) {
            state.news = action.payload;
        },
    }
})

export const {removeNew,setNew,setNews } = newsSlice.actions;
export default newsSlice.reducer;