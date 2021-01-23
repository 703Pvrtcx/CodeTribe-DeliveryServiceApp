import { Injectable } from '@angular/core';
import { Product } from './../../app/mocks/product';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: CartItem[]=[];

  private cartItemCount = new BehaviorSubject(0);
 
  constructor(private firestore: AngularFirestore) { 
  }
  
  addItemToCart(product:CartItem) {
   
   let item_id = product.id;
   let name = product.name;
   let desc = product.description;
   let price = product.price;
   let image = product.image;
   let cat = product.category;
   let id = this.firestore.createId();
   let qty;
   let isFound = false;

   if(this.cart.length>0){
     for(let currentItem in this.cart){
       if(this.cart[currentItem]['id']==item_id){
          let price = this.cart[currentItem]['price'];
          this.cart[currentItem]['qty'] +=1;
          this.cart[currentItem]['total_price'] += price;
          isFound = true;
          break;
       }
     }
    if(isFound == false){
      this.cart.push(
        {
         // 'no': item_no,
          'id': id,
          'name': name,
          'description': desc,
          'price':price,
          'image': image,
          'qty': 1,
          'total_price': price,
          'category': cat,
        });
    }
   }else{
     qty = 1;
     let total_price = price;
     this.cart.push(
      {
        //'no': item_no,
        'id': id,
        'name': name,
        'description': desc,
        'price':price,
        'image': image,
        'qty': qty,
        'total_price': total_price,
        'category': cat,
      });
   }
      this.cartItemCount.next(this.cartItemCount.value + 1);
       console.log(this.cart);
  }
 
  getProductLoad(){
    return this.firestore.collection('Product').snapshotChanges();
  }
  getCart(){
    return this.cart;
  }
  getCartItemCount(){
    return this.cartItemCount;
  }
  addProduct(product: CartItem) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.qty += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      // this.cart.push(
      //   {name: product.name,
      //   id: product.id,
      //   price: product.price,
      //   qty: product.qty,
      //   image: product.image,
      //   category: product.category,
      //   description: product.description,
      //   createdDate: product.createdDate
      //  });
      console.log(product.name +  ' - ' + product.qty + ' added to cart');
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
  decreaseProduct(product: CartItem) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.qty -= 1;
        if (p.qty == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }
  increaseProduct(product: CartItem) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.qty += 1;
      }
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
  removeProduct(product: CartItem) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.qty);
        this.cart.splice(index, 1);
      }
    }
  }
resetCart(){
  
  this.cartItemCount.next(this.cartItemCount.value * 0);
  return this.cart=[];
}

}



