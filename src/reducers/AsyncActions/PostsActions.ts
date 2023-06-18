import { AppDispatch, RootState } from "../../app/store"
import { Post, PostCreator } from "../../utils/types/PostTypes"
import { UserData } from "../../utils/types/UserTypes"
import { base_url } from "../../utils/utils"
import { putPosts } from "../PostsReducer/PostsReducer"

export const getPostsById = (_id: string) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        fetch(`${base_url}/posts/${_id}`, {
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
            .then(posts => {                
                dispatch(putPosts(posts));
            })
    }
}



export const createPost = (user: UserData, userId: string, post: PostCreator) => {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        fetch(`${base_url}/posts`, {
            method: 'POST',
            body: JSON.stringify({
                _id: userId,
                title: post.title,
                text: post.text,
                grades: post.grades
            }),
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
            .then(post => {
                
                dispatch(getPostsById(userId));
            })
    }
}