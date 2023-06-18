import { AppDispatch } from "../../app/store"
import { setUsers } from "../UsersReducer/UsersReducer"

const base_url = 'http://localhost:4444'

export const getUsers = () => {
    return (dispatch: AppDispatch) => {
        fetch(`${base_url}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.status.toString())
                }
            })
            .then(users => {
                dispatch(setUsers(users));
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}
