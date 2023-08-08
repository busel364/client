export interface UserTech {
    name:string,
    id:string,
    userId:string,
    messages: Message[],
    newMessage: boolean,
}

export interface Message {
    content: string,
    to: string,
    from: string,
}