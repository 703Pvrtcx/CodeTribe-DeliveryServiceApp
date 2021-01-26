
import { CartService } from '../../services/cart.service';
import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { AlertController, ModalController, ToastController,LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { UserAddressService } from 'src/app/services/user-address.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { SavedAddressComponent } from '../profile-tab/saved-address/saved-address.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserOrdersService } from 'src/app/services/user-orders.service';

export interface Item { 
  id: string;
  userID: string;
  name: string;
  total: number;
  address: any[];
  createdDate: string;

}

@Component({
  selector: 'app-cartview',
  templateUrl: './cartview.page.html',
  styleUrls: ['./cartview.page.scss'],
})
export class CartviewPage implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  checkoutForm;
  total: number;
  numitem: number;
  public now: any = (new Date()).toISOString();
  payment = [{name: "Cash"},{name: "Credit"}];

  user = {} as UserInfo;
  order = {} as UserOrder;

  savedAddresses=[];

  selectedAddress: boolean;
  selectedPayment: boolean;
 
   addressUser: any;
   cartItemCount: BehaviorSubject<number>;
   item;  
   //cart = {} as Product[];
   cart: CartItem[]=[];

   cartItems = {} as UserOrder;
   orders= {} as UserOrder;
   orderCart = {} as Item;

  @ViewChild('cart', {static: false, read: ElementRef}) fab: ElementRef;
  constructor( 
    private cartService: CartService, 
    public toastController: ToastController,
              private modalCtrl: ModalController, 
              private router: Router,
              private address: UserAddressService,
              private orderService: UserOrdersService,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private  asf: AngularFirestore,) { 
        
                this.getAddress(); 
                this.itemsCollection = asf.collection<Item>('FridayCart');
                this.items = this.itemsCollection.valueChanges();
              }
              ngOnInit() {
               this.cart = this.cartService.getCart();
                this.cartItemCount = this.cartService.getCartItemCount();
                this.selectedAddress = false;
                this.selectedPayment = false;
              }  
 onSelectChangedpay(e) {
                this.order.payment = e;
                this.selectedPayment = true;
              }
onSelectChanged(e) {
                this.user.address = e;
                this.selectedAddress = true;
              }
  addItem(item: Item) {
                this.itemsCollection.add(item);
              }        
     getAddress(){
      let userID = firebase.auth().currentUser.uid.toString();
      this.address.getUserAddress(userID).subscribe(data => {
  
        this.savedAddresses = data.map(e => {
          return{
            key: e.payload.doc.id,
            ... e.payload.doc.data() as UserInfo
          } as UserInfo
        })
      });
    }
  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product); 
    this.toast(product.name, " x" + product.qty);
  }
  increaseCartItem(product) {
    this.cartService.addProduct(product);
    this.toast(product.name, " x" + product.qty);
  }
  removeCartItem(product) {
  this.cartService.removeProduct(product);
  this.toast(product.name, " has been removed!");
  }
  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.qty, 0);
  }
  close() {
    this.modalCtrl.dismiss();
    this.router.navigateByUrl('');
  }

  carddetails() {
    this.close();
    this.router.navigate(['/payments']);
  }
  
  placeOrder() {

    this.orders.id = this.asf.createId();
    this.orders.userID = firebase.auth().currentUser.uid.toString();
    this.orders.total = this.getTotal();
    this.orders.createdDate = this.now;
    this.orders.cart = this.cart;

    this.orderService.placeOrder(this.orders);
  //  this.presentLoading();
    this.checkout();
     this.cart = this.cartService.resetCart();

  } 
  
  async checkout() {
    // Perfom PayPal or Stripe checkout process
    
    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'We will deliver your food as soon as possible',
      buttons: ['OK']
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }

  async toast(obj: string ,mesg:string){
    const toast = await this.toastController.create({
      message: obj + ' ' + mesg,
      duration: 2000,
    });
    toast.present();
  }
  async presentLoading() {
    const loader = this.loadingCtrl.create({
      message: "Please wait...",
      duration: 3000
    });
    (await loader).present();
    
  }
}
