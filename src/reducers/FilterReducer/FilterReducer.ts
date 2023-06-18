import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { City } from "../../utils/types/CitiesTypes";

const defState = {
    city: null as City|null,
    service: '' as string,
    town:'' as string,
}

const filterSlice = createSlice({
    initialState: defState,
    name: 'filter',
    reducers:{
        setCity(state, action: PayloadAction<City>) {
            state.city = action.payload;
        },
        setService(state, action: PayloadAction<string>) {
            state.service = action.payload;
        },
        setTown(state, action: PayloadAction<string>) {
            state.town = action.payload;
        }

    }
})

export const {setCity,setService,setTown} = filterSlice.actions;
export default filterSlice.reducer;