import { UserData } from "./UserTypes"

export interface PostReducer {
    userId: string,
    posts: Post[]
}

export interface Post {
    title: string,
    text: string,
    user: UserData,
    userSharedPost: UserData,
    grades: Grades,
    updatedAt: string
    _id: string
}

export interface Grades {
    ratio: number,
    price: number,
    quality: number,
    times: number
}

export interface PostCreator {
    text: string,
    title: string,
    grades: Grades
}