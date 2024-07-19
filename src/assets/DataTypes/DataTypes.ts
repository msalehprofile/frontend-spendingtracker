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

export type SubmittedSpends = {
    id: number;
    userId: number;
    amount: number;
    vendor: string;
    category: string;
    date: string;
}

export type EnteredSpend = {
    amount: number;
    vendor: string;
    category: string;
    date: string;
}

export type UserBudget = {
    id: number;
    monthlyIncome: number;
    billsbudget: number;
    "rent/mortgage": number;
    vendor: string;
    category: string;
}