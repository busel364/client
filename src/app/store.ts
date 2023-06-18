import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import LanguageReducer from '../reducers/LanguageReducer/LanguageReducer';
import ModeReducer from '../reducers/ModeReducer/ModeReducer';
import UserReducer from '../reducers/UserReducer/UserReducer';
import UsersReducer from '../reducers/UsersReducer/UsersReducer';
import ChangingPass from '../reducers/UserReducer/ChangingPass';
import PostsReducer from '../reducers/PostsReducer/PostsReducer';
import CitiesReducer from '../reducers/CitiesReducer/CitiesReducer';
import FilterReducer from '../reducers/FilterReducer/FilterReducer';

export const store = configureStore({
  reducer: {
    language: LanguageReducer,
    user: UserReducer,
    mode: ModeReducer,
    users: UsersReducer,
    accessChangePass: ChangingPass,
    posts: PostsReducer,
    cities: CitiesReducer,
    filter: FilterReducer,
    
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
