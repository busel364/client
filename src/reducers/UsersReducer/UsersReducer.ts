import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../utils/types/UserTypes";

const defState = [] as UserData[];

const usersSlice = createSlice({
    name: 'users',
    initialState: defState,
    reducers: {
        setUsers(state, action: PayloadAction<UserData[]>) {
            return action.payload;
        }
    }
})

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;