import { AppDispatch, RootState } from "../../app/store"
import { DescriptionUser, Prices, UserUpdate } from "../../utils/types/UserTypes"
import { base_url } from "../../utils/utils"
import { setSelectedUser } from "../SelectedUserReducer/SelectedUserReducer"

export const getSelectedUser = (_id: string) => {
    return (dispatch: AppDispatch) => {
        fetch(`${base_url}/users/${_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.status.toString())
                }
            })
            .then(data => {
                dispatch(setSelectedUser(data));
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}

export const adminUpdateUser = (user: UserUpdate) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        fetch(`${base_url}/user/update`, {
            method: 'PATCH',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                Authorization: user.token!
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.status.toString())
                }
            })
            .then(data => {
                dispatch(getSelectedUser(user._id));
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}

export const adminUpdatePrices = (token: string, _id: string, prices: Prices[]) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        fetch(`${base_url}/user/updatePrices`, {
            method: 'PATCH',
            body: JSON.stringify({ prices, _id }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.status.toString())
                }
            })
            .then(data => {
                dispatch(getSelectedUser(_id));
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}

export const adminUpdateDescription = (token: string, description: DescriptionUser, _id: string) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        fetch(`${base_url}/user/updateDescription`, {
            method: 'PATCH',
            body: JSON.stringify({ description, _id }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.status.toString())
                }
            })
            .then(data => {
                dispatch(getSelectedUser(_id));
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}
