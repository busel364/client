import { AppDispatch, RootState } from "../../app/store"
import { News, NewsCreator } from "../../utils/types/NewsTypes"
import { base_url } from "../../utils/utils"
import { removeNew, setNew, setNews } from "../NewsReducer/NewsReducer"

export const createNews = (data: NewsCreator) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        fetch(`${base_url}/newsPost`, {
            method: 'POST',
            body: JSON.stringify({ author: getState().user._id, data }),
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
            .then(news => {
                dispatch(setNew(news));
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}

export const updateNews = (news: News) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        fetch(`${base_url}/newsPost/${news._id}`, {
            method: 'PATCH',
            body: JSON.stringify({ data: news.data }),
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
                console.log(data);
                dispatch(setNew(data));
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}

export const deleteNews = (_id:string) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        fetch(`${base_url}/newsPost/${_id}`, {
            method: 'DELETE',
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
                dispatch(removeNew());
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}

export const getNew = (id: string) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        fetch(`${base_url}/newsPost/${id}`, {
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
                dispatch(setNew(data));
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}

export const getNews = () => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        fetch(`${base_url}/newsPost`, {
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
                dispatch(setNews(data));
            })
            .catch(e => {
                console.log(e.message);
                //TODO handle error               
            })
    }
}