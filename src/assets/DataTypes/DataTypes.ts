export type Users = {
    id: number;
    firstName: string;
    secondName: string;
    email: string;
    password: string;
}

export type UserLogin = {
    email: string;
    password: string;
}