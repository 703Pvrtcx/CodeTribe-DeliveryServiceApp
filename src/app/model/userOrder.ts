class UserOrder {

    id: string;
    key?:string;
    userID: string;
    createdDate: Date;
    address: string;
    payment: string;
    cart:  CartItem[]=[];
    total: number;
    name: string;

}