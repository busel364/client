import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post, PostReducer } from "../../utils/types/PostTypes";

const defState: Post[] = []


const postsSlice = createSlice({
    initialState: defState,
    name: 'posts',
    reducers: {
        putPosts(state, action: PayloadAction<Post[]>) {
            return action.payload;
        }
    }
})


export const { putPosts } = postsSlice.actions;
export default postsSlice.reducer;