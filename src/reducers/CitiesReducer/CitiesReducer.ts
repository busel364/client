import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { City } from "../../utils/types/CitiesTypes";

const defState = {
    cities: [] as City[],
    city: null as City | null
};

const citiesSlice = createSlice({
    name: 'cities',
    initialState: defState,
    reducers: {
        setCities(state, action: PayloadAction<any[]>) {
            state.cities = action.payload;
        },
        setCity(state, action: PayloadAction<City>) {
            state.city = action.payload;
        }

    }

})

export const { setCities, setCity } = citiesSlice.actions;
export default citiesSlice.reducer;