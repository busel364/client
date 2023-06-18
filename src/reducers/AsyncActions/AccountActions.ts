import { AppDispatch, RootState } from "../../app/store"
import { DescriptionUser, UserData, UserLogin, UserRegister, UserUpdate } from "../../utils/types/UserTypes"
import { base_url, encodeBase64 } from "../../utils/utils"
import { changeAccess } from "../UserReducer/ChangingPass"
import { logIn, userDataUpdate } from "../UserReducer/UserReducer"
import { getUsers } from "./UsersActions"


export const registerUser = (user: UserRegister) => {
    return (dispatch: AppDispatch) => {
        fetch(`${base_url}/auth/register`, {
            method: 'Post',
            body: JSON.stringify(user),
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.status.toString())
                }
            })
            .then(userProfile => {
                dispatch(getCurUser(userProfile.token));
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}


export const fetchUser = (user: UserLogin) => {
    return (dispatch: AppDispatch) => {
        fetch(`${base_url}/auth/login`, {
            method: 'Post',
            body: JSON.stringify(user),
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
            .then(userProfile => {
                dispatch(getCurUser(userProfile.token));
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}

export const getCurUser = (token: string) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        fetch(`${base_url}/auth/me`, {
            method: 'GET',
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
            .then(user => {
                dispatch(logIn({ ...user, token: token }));
            })
    }
}

export const fetchImage = (img: any, user: UserUpdate) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        const formdata = new FormData();
        formdata.append("image", img);

        fetch(`${base_url}/upload`, {
            method: 'POST',
            body: formdata,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': user.token!
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.status.toString())
                }
            })
            .then(res => {
                console.log(res);

                dispatch(updateUser({ ...user, token: getState().user.token!, avatarUrl: res.url }))
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}

export const updateUser = (user: UserUpdate) => {
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
                dispatch(getCurUser(user.token));
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}

export const updatePrices = (token: string) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        fetch(`${base_url}/user/updatePrices`, {
            method: 'PATCH',
            body: JSON.stringify({ prices: getState().user.prices, _id: getState().user._id }),
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
                // const {userData, success} = data;
                dispatch(getCurUser(token));
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}

export const updateDescription = (token: string, description: DescriptionUser) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        fetch(`${base_url}/user/updateDescription`, {
            method: 'PATCH',
            body: JSON.stringify({ description, _id: getState().user._id }),
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
                dispatch(getCurUser(token));
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}

export const updateQA = (token: string, question: { _id: string, answer: string }) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        fetch(`${base_url}/user/updateQA`, {
            method: 'PATCH',
            body: JSON.stringify({ question, _id: getState().user._id }),
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
                dispatch(getCurUser(token));
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}

export const deleteQA = (token: string, question: { _id: string }) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        fetch(`${base_url}/user/deleteQA`, {
            method: 'PATCH',
            body: JSON.stringify({ question, _id: getState().user._id }),
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
                dispatch(getCurUser(token));
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}

export const addQuestion = (_id: string, token: string, title: string, question: string) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        fetch(`${base_url}/user/updateQA`, {
            method: 'POST',
            body: JSON.stringify({ title, question, _id, answer: '' }),
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

                dispatch(getUsers());
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}

export const addGrade = (_id: string, token: string, grade: number) => {
    return (dispatch: AppDispatch) => {
        fetch(`${base_url}/user/grades`, {
            method: 'POST',
            body: JSON.stringify({ grade, _id }),
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
                console.log(data);

                dispatch(getUsers());
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}

export const updateRoles = (_id: string, token: string, roles: string[]) => {
    return (dispatch: AppDispatch) => {
        fetch(`${base_url}/user/roles`, {
            method: 'POST',
            body: JSON.stringify({ _id, roles }),
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
                dispatch(getUsers());
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}

export const checkPassword = (password: string) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        fetch(`${base_url}/auth/checkpass`, {
            method: 'POST',
            body: JSON.stringify(
                {
                    _id: getState().user._id!,
                    password
                }
            ),
            headers: {
                'Content-Type': 'application/json',
                Authorization: getState().user.token!
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
                dispatch(changeAccess(true));
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}

export const updatePassword = (password: string) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        fetch(`${base_url}/user/updatePass`, {
            method: 'PATCH',
            body: JSON.stringify({ password, _id: getState().user._id }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: getState().user.token!
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.status.toString())
                }
            })
            .then(user => {
                console.log(user);

                dispatch(getCurUser(user.token));
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}


export const updateUserGrafics = (user: UserUpdate) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        fetch(`${base_url}/user/updateGrafics`, {
            method: 'POST',
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
                dispatch(getCurUser(user.token));
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}


// export const updateUser = (firstName: string, lastName: string) => {
//     return (dispatch: AppDispatch, getState: () =>RootState) => {
//         fetch(`${base_url}/user`, {
//             method: 'PUT',
//             body: JSON.stringify({ firstName, lastName }),
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: getState().loginPage.token!
//             }
//         })
//             .then(response => {
//                 if (response.ok) {
//                     return response.json()
//                 } else {
//                     throw new Error(response.status.toString())
//                 }
//             })
//             .then(userProfile => {
//                 dispatch(logIn(userProfile));
//             })
//             .catch(e => {
//                 console.log(e.message);
//                 //TODO handle error
//             })

//     }
// }

// export const changePassword = (oldPassword: string, newPassword: string) => {
//     return (dispatch: AppDispatch, getState: () => RootState) => {
//         fetch(`${base_url}/user/password`, {
//             method: 'PUT',
//             headers: {
//                 'X-Password': newPassword,
//                 Authorization: createToken(getState().loginPage.user!.login, oldPassword)
//             }
//         })
//             .then(response => {
//                 if (response.ok) {
//                     dispatch(putToken(createToken(getState().loginPage.user!.login, newPassword)))
//                 } else {
//                     throw new Error(response.status.toString())
//                 }
//             })
//             .catch(e => {
//                 console.log(e.message);
//                 //TODO handle error
//             })

//     }
// }