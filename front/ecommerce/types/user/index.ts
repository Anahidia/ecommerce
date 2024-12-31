import Orders from "../orders";

export default interface Login {
    email: string;
    password:string;
}

export interface Register {
    name:string;
    email: string;
    password:string;
    confirmPassword: string;
    phone:number,
    address: string;
    city:string;
    country:string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone: number;
    address: string;
    city:string;
    country: string;
    isAdmin:boolean;
    orders:Orders[]
}
