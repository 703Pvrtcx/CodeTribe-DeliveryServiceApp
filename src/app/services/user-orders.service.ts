import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

export interface Item { 
  id: string;
  userID: string;
  name: string;
  total: number;
}
@Injectable({
  providedIn: 'root'
})
export class UserOrdersService {


  
  address;
  constructor(private asf: AngularFirestore, private router: Router) { }

  placeOrder(orders: UserOrder){
 
    this.asf.collection("UserOrder").doc(orders.id).set({
    userID : orders.userID,
    cart: orders.cart,
    createdDate: orders.createdDate,
    total : orders.total
    }).then(()=>{
      console.log("Document succesfully written!");

      //this.router.navigate(['profile-tab']); 
    }).catch(err=> {
      console.log(err.message + ' order was unable to be added!');
    })
  }
  getUserOrder(userID){
    return this.asf.collection('UserOrder', ref => ref.where('userID','==', userID)).snapshotChanges();
  }
}
