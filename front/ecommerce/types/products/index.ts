import Categories from "../categories";

export default interface Products {
    id: string;
    name:string;
    description: string;
    price:number;
    stock:number;
    imgUrl: string;
    category:Categories[];
}

