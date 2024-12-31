import Products from "../products";

export default interface Categories{
    id: string;
    name: string;
    products:Products[];
}