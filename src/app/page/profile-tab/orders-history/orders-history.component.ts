import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/services/cart.service';
import { UserAddressService } from 'src/app/services/user-address.service';
import { UserOrdersService } from 'src/app/services/user-orders.service';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss'],
})
export class OrdersHistoryComponent implements OnInit {
  order1 = {} as UserOrder;
  order: UserOrder[]=[];
  myBookList = [];
  constructor(  private address: UserAddressService,
    private orders: UserOrdersService,
    private cart: CartService,
    private asf: AngularFirestore) { }

  ngOnInit() {
    this.getOrders();
  }
  getOrders(){
    
    let userID = firebase.auth().currentUser.uid.toString();
    this.orders.getUserOrder(userID).subscribe(data => {

      this.order = data.map(e => {
        return{
          key: e.payload.doc.id,
          ... e.payload.doc.data() as UserOrder
        } as UserOrder
      })
    });
  }
  delete(key){
    this.asf.collection('UserOrder').doc(key.key).delete().then(()=>{
    })
  }
}
