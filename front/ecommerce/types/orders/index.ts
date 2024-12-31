import Products from "../products";
import { User } from "../user";

export default interface Orders {
    id: string;
    date:Date;
    user: User;
    orderdetails:OrderDetails;

}

export  interface OrderDetails {
    id: string;
    price: number;
    products:Products[]
}