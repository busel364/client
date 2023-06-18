export interface User {
    name: string | null,
    token: string | null,
    login: string | null,
    tel: string | null
}

export interface UserRegister {
    fullName: string,
    tel: string,
    email: string,
    password: string,
}

export interface UserLogin {
    email: string,
    password: string,
}

export interface UserData {
    avatarUrl?: string | null,
    tel?: string | null,
    createdAt: string | null,
    email: string | null,
    fullName: string | null,
    updatedAt: string | null,
    categories?: string[] | null,
    __v: 0 | null,
    _id: string | null,
    token: string | null,
    description: DescriptionUser | null,
    commentsOnUserPage?: any[] | null,
    commentsByUser?: any[] | null,
    grafics?: Grafics | null,
    prices?: Prices[] | null,
    grades: number[]|null,
    roles:string[]|null,
    questionsAndAnswers: QuestionsAndAnswers[] | null
}

export interface QuestionsAndAnswers {
    _id: string | null,
    title: string,
    question: string,
    answer: string
}

export interface DescriptionUser {
    main: string | null,
    specialization: string[] | null,
    experience: string,
    warrantly: string
}

export interface UserUpdate {
    avatarUrl?: string,
    tel?: string,
    fullName: string,
    _id: string,
    token: string,
}

export interface UserPasswordUpdate {
    oldPassword: string | undefined,
    newPassword: string | undefined
}

export interface Grafics {
    ratio: any[] | null,
    price: any[] | null,
    quality: any[] | null,
    times: any[] | null,
}

export interface Prices {
    [key: string]: string | number,
    'service': string,
    'price': string,
    'id': number
}