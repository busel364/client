import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Message, UserTech } from "../../utils/types/TechHelperTypes"

const defState: {
    curUser: UserTech | null,
    users: UserTech[],
    messages: Message[]
    newMessage: boolean
} = {
    curUser: null,
    users: [],
    messages: [],
    newMessage: false
}

const techHelperSlice = createSlice({
    initialState: defState,
    name: 'techHelper',
    reducers: {
        setUsers(state, action: PayloadAction<UserTech[]>) {
            state.users = action.payload;
        },
        appendUser(state, action: PayloadAction<UserTech>) {
            state.users.push(action.payload);
        },
        removeUser(state, action: PayloadAction<string>) {
            const i = state.users.findIndex(item => item.id === action.payload);
            if (i !== -1) {
                state.users.splice(i, 1);
            }
        },
        setCurUser(state, action: PayloadAction<UserTech>) {
            state.curUser = action.payload;
        },
        addMessage(state, action: PayloadAction<{ id: string, message: Message }>) {
            const i = state.users.findIndex(item => item.id === action.payload.id);
            if (i !== -1) {
                console.log('-1');
                state.users[i] = { ...state.users[i], messages: state.users[i] && state.users[i].messages ? [...state.users[i].messages, action.payload.message] : [action.payload.message] }
                if (state.curUser && state.curUser.id === state.users[i].id) {
                    state.curUser = state.users[i];
                }
            }

        },
        addMessageToCurUser(state, action: PayloadAction<Message>) {
            if (state.curUser) {
                state.curUser.messages.push(action.payload);
                const i = state.users.findIndex(item => item.id === state.curUser!.id);
                state.users[i] = state.curUser;
            }
        },
        setNotAdminMessages(state, action: PayloadAction<Message>) {
            state.messages.push(action.payload);
        },
        setIsNewMessage(state) {
            state.newMessage = !state.newMessage;
        }
    }
})

export const { addMessage, setCurUser, setUsers, setNotAdminMessages, addMessageToCurUser, appendUser, removeUser, setIsNewMessage } = techHelperSlice.actions;
export default techHelperSlice.reducer;