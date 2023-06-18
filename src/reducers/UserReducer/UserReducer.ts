import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Prices, QuestionsAndAnswers, UserData, UserUpdate } from "../../utils/types/UserTypes";
import { decodeBase64, encodeBase64 } from "../../utils/utils";

const defState: UserData = {
    avatarUrl: null,
    tel: null,
    createdAt: null,
    email: null,
    fullName: null,
    updatedAt: null,
    categories: null,
    __v: null,
    _id: null,
    token: null,
    grades: [] as number[],
    commentsOnUserPage: null,
    commentsByUser: null,
    grafics: null,
    description: null,
    prices: [] as Prices[],
    roles: [] as string[],
    questionsAndAnswers: [] as QuestionsAndAnswers[]
}

const userSlice = createSlice({
    initialState: defState,
    name: 'user',
    reducers: {
        logIn(state, action: PayloadAction<UserData>) {
            localStorage.setItem('user', encodeBase64(JSON.stringify({ token: action.payload.token, date: Date.now() })));
            return action.payload;
        },
        logOut(state) {
            localStorage.removeItem('user');
            return {
                avatarUrl: null,
                tel: null,
                createdAt: null,
                email: null,
                fullName: null,
                updatedAt: null,
                categories: null,
                __v: null,
                _id: null,
                token: null,
                commentsOnUserPage: null,
                commentsByUser: null,
                grafics: null,
                description: null,
                grades: [] as number[],
                prices: [] as Prices[],
                roles: [] as string[],
                questionsAndAnswers: [] as QuestionsAndAnswers[]
            };
        },
        userDataUpdate(state, action: PayloadAction<{ avatarUrl: string, fullName: string, tel: string }>) {
            state = { ...state, fullName: action.payload.fullName, avatarUrl: action.payload.avatarUrl, tel: action.payload.tel };
            state.fullName = action.payload.fullName;
            state.avatarUrl = action.payload.avatarUrl;
            state.tel = action.payload.tel;
            localStorage.setItem('user', encodeBase64(JSON.stringify(state)));
        },
        pricesUpdate(state, action: PayloadAction<Prices>) {
            const index = state.prices?.findIndex(item => item.id === action.payload.id);
            state.prices![index!] = action.payload;
        },
        pricesAdd(state) {
            state.prices = !state.prices ? [] as Prices[] : state.prices;
            state.prices.unshift({
                id: state.prices.length > 0 ? state.prices[0].id + 1 : 1,
                price: '',
                service: ''
            })
        },
        pricesRemove(state, action: PayloadAction<number>) {
            const index = state.prices!.findIndex(value => action.payload === value.id);
            state.prices!.splice(index, 1);
        }

    }
})

export const { logIn, logOut, userDataUpdate, pricesAdd, pricesRemove, pricesUpdate } = userSlice.actions;
export default userSlice.reducer;