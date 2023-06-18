import { AppDispatch, RootState } from "../../app/store";
import { setCities } from "../CitiesReducer/CitiesReducer";

export const getCities = () => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        fetch('https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=1267', {
            method: 'GET',
            // mode: 'no-cors',
            // mode: 'cors',
            // headers: {
            //     "Content-Type": "application/json" // this shows the expected content type
            // },
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(cities => {
                console.log(cities);
                setCities(cities);

            })
            .catch(e => console.log(e))
    }
}

