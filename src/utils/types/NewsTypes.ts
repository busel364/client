import { UserData } from "./UserTypes";

export interface NewsCreator {
    amp: any,
    chunks: any,
    design: any,
    html: string
}

export interface News {
    author: UserData,
    _id: string,
    data: NewsCreator,
    createdAt: string,
    updatedAt: string | null,
}