import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../utils/types/UserTypes";

const defState = null as UserData | null

const selectedUserSlice = createSlice({
    initialState: defState,
    name: 'selectedUser',
    reducers: {
        setSelectedUser(state, action: PayloadAction<UserData>) {
            return action.payload
        },
        removeSelectedUser(state) {
            return null;
        }
    }
})

export const { removeSelectedUser, setSelectedUser } = selectedUserSlice.actions;
export default selectedUserSlice.reducer;