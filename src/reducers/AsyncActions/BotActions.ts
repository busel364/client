import { AppDispatch } from "../../app/store";
import { BOTData, base_url } from "../../utils/utils";

export const sendMsg = (data:BOTData) => {
    return (dispatch: AppDispatch) => {
        fetch(`${base_url}/botdata`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}